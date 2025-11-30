import { useEffect, useState } from "react";
import { topicService } from "../services/topicService";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import Container from "../components/Container";
import "./Catalog.css";

export default function Catalog() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <Container>
            <div className="catalog-page">
                <PageTitle>Всички теми</PageTitle>

                {loading ? (
                    <div className="catalog-loading">
                        <p>Зареждане...</p>
                    </div>
                ) : topics.length === 0 ? (
                    <div className="catalog-empty">
                        <p>Няма създадени теми.</p>
                        <p className="catalog-empty-subtitle">Бъди първият, който споделя!</p>
                    </div>
                ) : (
                    <ul className="catalog-list">
                        {topics.map(topic => (
                            <li key={topic.id}>
                                <Card hover>
                                    <Link to={`/catalog/${topic.id}`} className="catalog-item-link">
                                        {topic.title}
                                    </Link>
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Container>
    );
}