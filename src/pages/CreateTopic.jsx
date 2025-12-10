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
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        const newErrors = {};

        if (!trimmedTitle) {
            newErrors.title = "Моля, въведи заглавие.";
        } else if (trimmedTitle.length < 3) {
            newErrors.title = "Заглавието трябва да е поне 3 символа.";
        }

        if (!trimmedContent) {
            newErrors.content = "Моля, въведи съдържание.";
        } else if (trimmedContent.length < 10) {
            newErrors.content = "Съдържанието трябва да е поне 10 символа.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setServerError("");
            return;
        }

        try {
            setIsSubmitting(true);
            setErrors({});
            setServerError("");

            await topicService.create(
                {
                    title: trimmedTitle,
                    content: trimmedContent,
                    ownerId: user.email,
                    likes: 0,
                    likedBy: [],
                },
                user.accessToken
            );
            navigate("/catalog");
        } catch (err) {
            console.error(err);
            setServerError("Възникна грешка при записа на темата. Моля, опитай отново.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <div className="form-page">
                <PageTitle>Създай тема</PageTitle>

                <form className="form" onSubmit={onSubmit}>
                    {serverError && <ErrorMessage message={serverError} />}

                    <FormField
                        label="Заглавие"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Въведете заглавие на темата"
                        required
                        error={errors.title}
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
                        error={errors.content}
                    />

                    <div className="form-actions">
                        <Button type="submit" disabled={isSubmitting} fullWidth>
                            {isSubmitting ? "Запазване..." : "Създай тема"}
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
}