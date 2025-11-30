import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/bg-tate-logo-nobg.png";
import "./Navigation.css";

function Navigation() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="BG-Tate logo" />
          </Link>
        </div>

        <button 
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link 
              to="/" 
              onClick={closeMenu}
              className={isActive("/") ? "active" : ""}
            >
              Начало
            </Link>
          </li>
          <li>
            <Link 
              to="/catalog" 
              onClick={closeMenu}
              className={isActive("/catalog") ? "active" : ""}
            >
              Форум
            </Link>
          </li>

          {!isAuthenticated && (
            <>
              <li>
                <Link 
                  to="/login" 
                  onClick={closeMenu}
                  className={isActive("/login") ? "active" : ""}
                >
                  Вход
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  onClick={closeMenu}
                  className={isActive("/register") ? "active" : ""}
                >
                  Регистрация
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li>
                <Link 
                  to="/create" 
                  onClick={closeMenu}
                  className={isActive("/create") ? "active" : ""}
                >
                  Нова тема
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-logout-btn">
                  Изход
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
