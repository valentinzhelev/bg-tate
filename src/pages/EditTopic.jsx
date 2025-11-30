import { useEffect, useState, useContext } from "react";
import { topicService } from "../services/topicService";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PageTitle from "../components/PageTitle";
import FormField from "../components/FormField";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Container from "../components/Container";
import "./EditTopic.css";

export default function EditTopic() {
    const { topicId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        topicService.getById(topicId)
            .then(topic => {
                setTitle(topic.title);
                setContent(topic.content);
            })
            .catch(() => {
                setError("Грешка при зареждане на темата.");
            });
    }, [topicId]);

    const onEdit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !content.trim()) {
            setError("Попълнете всички полета");
            return;
        }

        setLoading(true);
        try {
            await topicService.update(
                topicId,
                { title: title.trim(), content: content.trim() },
                user.accessToken
            );
            navigate(`/catalog/${topicId}`);
        } catch (err) {
            setError("Грешка при запазване на промените. Моля опитайте отново.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <div className="form-page">
                <PageTitle>Редакция</PageTitle>

                <form className="form" onSubmit={onEdit}>
                    <ErrorMessage message={error} />

                    <FormField
                        label="Заглавие"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Въведете заглавие на темата"
                        required
                    />

                    <FormField
                        label="Съдържание"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Въведете съдържание на темата"
                        required
                        textarea
                        rows={8}
                    />

                    <div className="form-actions">
                        <Button type="submit" disabled={loading} fullWidth>
                            {loading ? "Запазване..." : "Запази"}
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
}