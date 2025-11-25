import { useEffect, useState } from "react";
import { topicService } from "../services/topicService";
import { Link } from "react-router-dom";

export default function Catalog() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        topicService.getAll()
            .then(data => setTopics(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section>
            <h1>Всички теми</h1>

            {topics.length === 0 && <p>Няма създадени теми.</p>}

            <ul>
                {topics.map(topic => (
                    <li key={topic.id}>
                        <Link to={`/catalog/${topic.id}`}>
                            {topic.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}