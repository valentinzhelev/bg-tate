import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onRegister = async (e) => {
        e.preventDefault();

        if (!email || !password || !repeatPassword) {
            setError("Моля, попълнете всички полета.");
            return;
        }

        if (password !== repeatPassword) {
            setError("Паролите не съвпадат.");
            return;
        }

        try {
            await register(email, password);
            navigate("/catalog");
        } catch (err) {
            setError("Грешка при регистрация.");
        }
    };

    return (
        <section>
            <h1>Регистрация</h1>

            <form onSubmit={onRegister}>
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

                <label>Повтори парола:</label>
                <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />

                <button type="submit">Регистрация</button>
            </form>
        </section>
    );
}