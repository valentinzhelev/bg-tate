import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navigation() {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className="nav">
            <h2 className="logo">BG-Tate</h2>

            <ul>
                <li><Link to="/">Начало</Link></li>
                <li><Link to="/catalog">Форум</Link></li>

                {!isAuthenticated && (
                    <>
                        <li><Link to="/login">Вход</Link></li>
                        <li><Link to="/register">Регистрация</Link></li>
                    </>
                )}

                {isAuthenticated && (
                    <>
                        <li><Link to="/create">Нова тема</Link></li>
                        <li><button onClick={logout}>Изход</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
}