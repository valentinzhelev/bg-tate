import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { topicService } from "../services/topicService";
import { AuthContext } from "../contexts/AuthContext";

export default function Details() {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    const [topic, setTopic] = useState(null);

    useEffect(() => {
        topicService.getById(topicId)
            .then(data => setTopic(data))
            .catch(err => console.error(err));
    }, [topicId]);

    const onDelete = async () => {
        if (!confirm("Сигурен ли си, че искаш да изтриеш темата?")) {
            return;
        }

        await topicService.delete(topicId, user?.accessToken);
        navigate("/catalog");
    };

    if (!topic) {
        return <p>Зареждане...</p>;
    }

    return (
        <section>
            <h1>{topic.title}</h1>
            <p>{topic.content}</p>

            {user && (
                <>
                    <Link to={`/edit/${topic.id}`}>Редакция</Link>
                    <button onClick={onDelete} style={{ marginLeft: 10 }}>Изтрий</button>
                </>
            )}
        </section>
    );
}