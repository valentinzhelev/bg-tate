import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import FormField from "../components/FormField";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Container from "../components/Container";
import "./Login.css";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const onLogin = async (e) => {
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

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setServerError("");
            return;
        }

        try {
            setIsSubmitting(true);
            setErrors({});
            setServerError("");

            await login(email.trim(), password.trim());

            const searchParams = new URLSearchParams(location.search);
            const from = searchParams.get("from") || "/catalog";
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setServerError("Възникна грешка при вход. Моля, опитай отново.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <div className="auth-page">
                <PageTitle>Вход</PageTitle>

                <form className="form" onSubmit={onLogin}>
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

                    <div className="form-actions">
                        <Button type="submit" disabled={isSubmitting} fullWidth>
                            {isSubmitting ? "Влизане..." : "Вход"}
                        </Button>
                    </div>

                    <p className="form-footer">
                        Нямаш акаунт? <Link to="/register">Регистрирай се</Link>
                    </p>
                </form>
            </div>
        </Container>
    );
}