import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-column footer-brand">
          <div className="footer-logo">bg-tate</div>
          <p className="footer-text">
            Общност за бащи, които търсят подкрепа, споделен опит и място за
            откровени разговори.
          </p>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Навигация</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Начало</Link>
            </li>
            <li>
              <Link to="/catalog">Форум</Link>
            </li>
            <li>
              <Link to="/popular">Популярни</Link>
            </li>
            <li>
              <Link to="/rules">Правила</Link>
            </li>
            <li>
              <Link to="/about">За bg-tate</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Форум</h3>
          <ul className="footer-links">
            <li>
              <Link to="/my-topics">Моите теми</Link>
            </li>
            <li>
              <Link to="/create">Създай тема</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BG-Tate. Всички права запазени.</p>
      </div>
    </footer>
  );
}

