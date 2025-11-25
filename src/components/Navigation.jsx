import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="nav">
            <h2 className="logo">BG-Tate</h2>

            <ul>
                <li><Link to="/">Начало</Link></li>
                <li><Link to="/catalog">Форум</Link></li>

                <li><Link to="/login">Вход</Link></li>
                <li><Link to="/register">Регистрация</Link></li>
            </ul>
        </nav>
    );
}