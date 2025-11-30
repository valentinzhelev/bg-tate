import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>BG-Tate</h3>
          <p>Платформа за бащи, които си помагат взаимно в отглеждането на децата и в живота</p>
        </div>

        <div className="footer-section">
          <h4>Навигация</h4>
          <ul>
            <li><Link to="/">Начало</Link></li>
            <li><Link to="/catalog">Форум</Link></li>
            <li><Link to="/login">Вход</Link></li>
            <li><Link to="/register">Регистрация</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Информация</h4>
          <ul>
            <li>За нас</li>
            <li>Правила</li>
            <li>Контакти</li>
            <li>Помощ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Следвайте ни</h4>
          <p>Споделете вашите идеи и участвайте в дискусии</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 BG-Tate. Всички права запазени.</p>
      </div>
    </footer>
  );
}

export default Footer;

