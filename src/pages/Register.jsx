import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import FormField from "../components/FormField";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Container from "../components/Container";
import "./Register.css";

export default function Register() {
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onRegister = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Моля, въведи имейл.";
        }

        if (!password.trim()) {
            newErrors.password = "Моля, въведи парола.";
        } else if (password.trim().length < 6) {
            newErrors.password = "Паролата трябва да е поне 6 символа.";
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "Моля, потвърди паролата.";
        } else if (password.trim() !== confirmPassword.trim()) {
            newErrors.confirmPassword = "Паролите не съвпадат.";
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

            await register(email.trim(), password.trim());
            navigate("/catalog");
        } catch (err) {
            console.error(err);
            setServerError("Възникна грешка при регистрация. Моля, опитай отново.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <div className="auth-page">
                <PageTitle>Регистрация</PageTitle>

                <form className="form" onSubmit={onRegister}>
                    {serverError && <ErrorMessage message={serverError} />}

                    <FormField
                        label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Въведете вашия email"
                        required
                        error={errors.email}
                    />

                    <FormField
                        label="Парола"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Въведете вашата парола"
                        required
                        error={errors.password}
                    />

                    <FormField
                        label="Повтори парола"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Повторете вашата парола"
                        required
                        error={errors.confirmPassword}
                    />

                    <div className="form-actions">
                        <Button type="submit" disabled={isSubmitting} fullWidth>
                            {isSubmitting ? "Регистрация..." : "Регистрация"}
                        </Button>
                    </div>

                    <p className="form-footer">
                        Вече имаш акаунт? <Link to="/login">Влез</Link>
                    </p>
                </form>
            </div>
        </Container>
    );
}