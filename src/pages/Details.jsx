import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { topicService } from "../services/topicService";
import { AuthContext } from "../contexts/AuthContext";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import "./Details.css";

export default function Details() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

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

    if (loading) {
        return (
            <Container>
                <div className="details-loading">
                    <p>Зареждане...</p>
                </div>
            </Container>
        );
    }

    if (!topic) {
        return (
            <Container>
                <div className="details-error">
                    <p>Темата не беше намерена.</p>
                    <Link to="/catalog">
                        <Button>Върни се към форума</Button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="details-page">
                <PageTitle>{topic.title}</PageTitle>

                <Card>
                    <div className="details-content">
                        <p>{topic.content}</p>
                    </div>
                </Card>

                {user && (
                    <div className="details-actions">
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