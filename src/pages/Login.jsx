import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Моля, попълнете и двете полета.");
            return;
        }

        try {
            await login(email, password);
            navigate("/catalog");
        } catch (err) {
            setError("Грешно потребителско име или парола.");
        }
    };

    return (
        <section>
            <h1>Вход</h1>

            <form onSubmit={onLogin}>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Парола:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Вход</button>
            </form>
        </section>
    );
}