import { useEffect, useState, useContext } from "react";
import { topicService } from "../services/topicService";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function EditTopic() {
    const { topicId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        topicService.getById(topicId).then(topic => {
            setTitle(topic.title);
            setContent(topic.content);
        });
    }, [topicId]);

    const onEdit = async (e) => {
        e.preventDefault();

        await topicService.update(
            topicId,
            { title, content },
            user.accessToken
        );

        navigate(`/catalog/${topicId}`);
    };

    return (
        <section>
            <h1>Редакция</h1>

            <form onSubmit={onEdit}>
                <label>Заглавие</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Съдържание</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit">Запази</button>
            </form>
        </section>
    );
}