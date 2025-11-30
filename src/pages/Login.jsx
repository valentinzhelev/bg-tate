import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
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
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Моля, попълнете и двете полета.");
            return;
        }

        setLoading(true);
        try {
            await login(email.trim(), password);
            navigate("/catalog");
        } catch (err) {
            setError("Грешно потребителско име или парола.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <div className="auth-page">
                <PageTitle>Вход</PageTitle>

                <form className="form" onSubmit={onLogin}>
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

                    <div className="form-actions">
                        <Button type="submit" disabled={loading} fullWidth>
                            {loading ? "Влизане..." : "Вход"}
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