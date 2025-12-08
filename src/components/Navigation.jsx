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

  const isActive = (path) => {
    if (path === "/catalog") {
      return location.pathname.startsWith("/catalog");
    }
    return location.pathname === path;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navigation">
      <div className="nav-top">
        <div className="nav-top-container">
          <div className="nav-logo">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="BG-Tate logo" />
            </Link>
          </div>

          <div className="nav-top-right">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Вход
                </Link>
                <Link 
                  to="/register" 
                  className="nav-btn-primary"
                  onClick={closeMenu}
                >
                  Регистрация
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/create" 
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Нова тема
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="nav-btn-secondary"
                >
                  Изход
                </button>
              </>
            )}
          </div>

          <button 
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div className="nav-bottom">
        <div className="nav-bottom-container">
          <ul className="nav-main-menu">
            <li>
              <Link 
                to="/" 
                onClick={closeMenu}
                className={isActive("/") && location.pathname === "/" ? "active" : ""}
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
          </ul>
        </div>
      </div>

      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-mobile-list">
          <li>
            <Link 
              to="/" 
              onClick={closeMenu}
              className={isActive("/") && location.pathname === "/" ? "active" : ""}
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
                <button onClick={handleLogout} className="nav-mobile-logout">
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
