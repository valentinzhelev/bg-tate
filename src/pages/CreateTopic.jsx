import { useState, useContext } from "react";
import { topicService } from "../services/topicService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import FormField from "../components/FormField";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Container from "../components/Container";
import "./CreateTopic.css";

export default function CreateTopic() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !content.trim()) {
            setError("Попълнете всички полета");
            return;
        }

        setLoading(true);
        try {
            await topicService.create(
                {
                    title: title.trim(),
                    content: content.trim(),
                    ownerId: user.email,
                    likes: 0,
                    likedBy: [],
                },
                user.accessToken
            );
            navigate("/catalog");
        } catch (err) {
            setError("Грешка при създаване на темата. Моля опитайте отново.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <div className="form-page">
                <PageTitle>Създай тема</PageTitle>

                <form className="form" onSubmit={onSubmit}>
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
                            {loading ? "Създаване..." : "Създай"}
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
}