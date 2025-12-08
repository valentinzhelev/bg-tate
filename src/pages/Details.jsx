import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { topicService } from "../services/topicService";
import { AuthContext } from "../contexts/AuthContext";
import Container from "../components/Container";
import Button from "../components/Button";
import "./Details.css";

export default function Details() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [liking, setLiking] = useState(false);

    useEffect(() => {
        topicService.getById(topicId)
            .then(data => {
                setTopic(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [topicId]);

    const onDelete = async () => {
        if (!window.confirm("Сигурен ли си, че искаш да изтриеш темата?")) {
            return;
        }

        setDeleting(true);
        try {
            await topicService.delete(topicId, user?.accessToken);
            navigate("/catalog");
        } catch (err) {
            alert("Грешка при изтриване на темата.");
            setDeleting(false);
        }
    };

    const onLike = async () => {
        if (!user || !topic || liking) return;
        
        const likedBy = topic?.likedBy ?? [];
        const hasLiked = likedBy.includes(user.email);
        
        if (hasLiked) return;

        setLiking(true);
        try {
            const updatedTopic = {
                ...topic,
                likes: (topic.likes || 0) + 1,
                likedBy: [...likedBy, user.email],
            };
            await topicService.update(topic.id, updatedTopic, user.accessToken);
            setTopic(updatedTopic);
        } catch (err) {
            alert("Грешка при харесване. Моля, опитайте отново.");
        } finally {
            setLiking(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Преди малко";
        const date = new Date(dateString);
        return date.toLocaleDateString("bg-BG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (loading) {
        return (
            <Container>
                <div className="topic-loading">
                    <p>Зареждане...</p>
                </div>
            </Container>
        );
    }

    if (!topic) {
        return (
            <Container>
                <div className="topic-error">
                    <p>Темата не беше намерена.</p>
                    <Link to="/catalog">
                        <Button>Върни се към форума</Button>
                    </Link>
                </div>
            </Container>
        );
    }

    const likeCount = topic?.likes ?? 0;
    const likedBy = topic?.likedBy ?? [];
    const hasLiked = user && likedBy.includes(user.email);
    const isOwner = user && topic && user.email === topic.ownerId;

    return (
        <Container>
            <div className="topic-page">
                <div className="topic-header">
                    <div className="topic-breadcrumb">
                        <Link to="/">Начало</Link>
                        <span> / </span>
                        <Link to="/catalog">Форум</Link>
                        <span> / </span>
                        <span>{topic.title}</span>
                    </div>
                    
                    <h1 className="topic-title">{topic.title}</h1>
                </div>

                <div className="topic-posts">
                    <div className="topic-post">
                        <div className="post-author">
                            <div className="post-avatar">
                                {topic.ownerId ? topic.ownerId.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div className="post-author-info">
                                <div className="post-author-name">{topic.ownerId ? topic.ownerId.split("@")[0] : "Анонимен"}</div>
                                <div className="post-author-email">{topic.ownerId || ""}</div>
                            </div>
                        </div>
                        <div className="post-content">
                            <div className="post-meta">
                                <span className="post-date">{formatDate(topic._createdOn || topic.createdOn)}</span>
                                <span className="post-likes">Харесвания: {likeCount}</span>
                            </div>
                            {user && !isOwner && (
                                <div className="post-like-action">
                                    <Button
                                        variant="outline"
                                        onClick={onLike}
                                        disabled={hasLiked || liking}
                                    >
                                        {hasLiked ? "Харесано" : liking ? "Харесване..." : "Харесай"}
                                    </Button>
                                </div>
                            )}
                            <div className="post-text">
                                {topic.content.split('\n').map((line, i) => (
                                    <p key={i}>{line || '\u00A0'}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {isOwner && (
                    <div className="topic-actions">
                        <Link to={`/edit/${topic.id}`}>
                            <Button variant="outline">Редакция</Button>
                        </Link>
                        <Button 
                            variant="danger" 
                            onClick={onDelete}
                            disabled={deleting}
                        >
                            {deleting ? "Изтриване..." : "Изтрий"}
                        </Button>
                    </div>
                )}
            </div>
        </Container>
    );
}
