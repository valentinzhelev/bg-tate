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
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
            setError("Моля, попълнете всички полета.");
            return;
        }

        if (password !== repeatPassword) {
            setError("Паролите не съвпадат.");
            return;
        }

        if (password.length < 6) {
            setError("Паролата трябва да бъде поне 6 символа.");
            return;
        }

        setLoading(true);
        try {
            await register(email.trim(), password);
            navigate("/catalog");
        } catch (err) {
            setError("Грешка при регистрация. Моля опитайте отново.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <div className="auth-page">
                <PageTitle>Регистрация</PageTitle>

                <form className="form" onSubmit={onRegister}>
                    <ErrorMessage message={error} />

                    <FormField
                        label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Въведете вашия email"
                        required
                    />

                    <FormField
                        label="Парола"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Въведете вашата парола"
                        required
                    />

                    <FormField
                        label="Повтори парола"
                        id="repeatPassword"
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        placeholder="Повторете вашата парола"
                        required
                    />

                    <div className="form-actions">
                        <Button type="submit" disabled={loading} fullWidth>
                            {loading ? "Регистриране..." : "Регистрация"}
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