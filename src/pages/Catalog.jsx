import { useEffect, useState, useContext } from "react";
import { topicService } from "../services/topicService";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Container from "../components/Container";
import Button from "../components/Button";
import "./Catalog.css";

export default function Catalog() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        topicService.getAll()
            .then(data => {
                setTopics(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "Преди малко";
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Преди малко";
        if (diffMins < 60) return `Преди ${diffMins} мин`;
        if (diffHours < 24) return `Преди ${diffHours} ч`;
        if (diffDays < 7) return `Преди ${diffDays} дни`;
        return date.toLocaleDateString("bg-BG");
    };

    return (
        <Container>
            <div className="forum-page">
                <div className="forum-header">
                    <div className="forum-header-left">
                        <h1 className="forum-title">Форум</h1>
                        <p className="forum-subtitle">Намери отговори на въпросите си и получи съвети от бащи.</p>
                    </div>
                    {isAuthenticated && (
                        <div className="forum-header-actions">
                            <Link to="/create">
                                <Button>Нова тема</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="forum-loading">
                        <p>Зареждане...</p>
                    </div>
                ) : topics.length === 0 ? (
                    <div className="forum-empty">
                        <p>Няма създадени теми.</p>
                        <p className="forum-empty-subtitle">Бъди първият, който споделя!</p>
                    </div>
                ) : (
                    <div className="forum-topics">
                        <div className="forum-topic-header">
                            <div className="forum-topic-title-col">Тема</div>
                            <div className="forum-topic-stats-col">Отговори</div>
                            <div className="forum-topic-views-col">Преглеждания</div>
                            <div className="forum-topic-last-col">Последен пост</div>
                        </div>

                        <ul className="forum-topic-list">
                            {topics.map(topic => (
                                <li key={topic.id} className="forum-topic-item">
                                    <Link to={`/catalog/${topic.id}`} className="forum-topic-link">
                                        <div className="forum-topic-avatar">
                                            <div className="forum-avatar-circle">
                                                {topic.ownerId ? topic.ownerId.charAt(0).toUpperCase() : "U"}
                                            </div>
                                        </div>
                                        <div className="forum-topic-content">
                                            <div className="forum-topic-title">{topic.title}</div>
                                            <div className="forum-topic-meta">
                                                <span className="forum-topic-author">
                                                    {topic.ownerId || "Анонимен"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="forum-topic-stats">
                                            <span className="forum-stat-value">0</span>
                                            <span className="forum-stat-label">отговори</span>
                                        </div>
                                        <div className="forum-topic-views">
                                            <span className="forum-stat-value">0</span>
                                            <span className="forum-stat-label">преглеждания</span>
                                        </div>
                                        <div className="forum-topic-last">
                                            <div className="forum-last-post">
                                                <span className="forum-last-time">{formatDate(topic._createdOn || topic.createdOn)}</span>
                                                <span className="forum-last-author">{topic.ownerId ? topic.ownerId.split("@")[0] : "Анонимен"}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Container>
    );
}
