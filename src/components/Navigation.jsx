import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/bg-tate-logo-nobg.png";
import "./Navigation.css";

function Navigation() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();

    if (!trimmed) {
      navigate("/catalog");
      return;
    }

    navigate(`/catalog?search=${encodeURIComponent(trimmed)}`);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      {/* TOP BAR */}
      <div className="nav-top">
        <div className="nav-top-inner">
          <div className="nav-left">
            <div className="nav-logo-wrapper">
              <Link to="/" className="nav-logo-link" onClick={closeMenu}>
                <img src={logo} alt="bg-tate" className="nav-logo" />
              </Link>
            </div>
          </div>

          {/* SEARCH CENTER */}
          <div className="nav-search">
            <form onSubmit={handleSearchSubmit} className="nav-search-form">
              <div className="nav-search-inner">
                <input
                  type="search"
                  className="nav-search-input"
                  placeholder="Търси във форума..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="nav-right">
            {!isAuthenticated ? (
              <div className="nav-auth-buttons">
                <NavLink to="/login" className="nav-link-ghost nav-link-button" onClick={closeMenu}>
                  Вход
                </NavLink>
                <NavLink to="/register" className="nav-link-primary nav-link-button" onClick={closeMenu}>
                  Регистрация
                </NavLink>
              </div>
            ) : (
              <div className="nav-auth-buttons">
                <NavLink to="/create" className="nav-link-primary nav-link-button" onClick={closeMenu}>
                  Нова тема
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="nav-link-ghost nav-link-button"
                >
                  Изход
                </button>
              </div>
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

      {/* BOTTOM BAR */}
      <nav className="nav-bottom">
        <div className="nav-bottom-inner">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "nav-main-link" + (isActive ? " nav-main-link-active" : "")
            }
            onClick={closeMenu}
          >
            Начало
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              "nav-main-link" + (isActive ? " nav-main-link-active" : "")
            }
            onClick={closeMenu}
          >
            Форум
          </NavLink>

          <NavLink
            to="/popular"
            className={({ isActive }) =>
              "nav-main-link" + (isActive ? " nav-main-link-active" : "")
            }
            onClick={closeMenu}
          >
            Популярни
          </NavLink>

          <NavLink
            to="/rules"
            className={({ isActive }) =>
              "nav-main-link" + (isActive ? " nav-main-link-active" : "")
            }
            onClick={closeMenu}
          >
            Правила
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              "nav-main-link" + (isActive ? " nav-main-link-active" : "")
            }
            onClick={closeMenu}
          >
            За bg-tate
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/my-topics"
              className={({ isActive }) =>
                "nav-main-link" + (isActive ? " nav-main-link-active" : "")
              }
              onClick={closeMenu}
            >
              Моите теми
            </NavLink>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-mobile-list">
          <li>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => isActive ? "active" : ""}
              onClick={closeMenu}
            >
              Начало
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/catalog" 
              className={({ isActive }) => isActive ? "active" : ""}
              onClick={closeMenu}
            >
              Форум
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/popular" 
              className={({ isActive }) => isActive ? "active" : ""}
              onClick={closeMenu}
            >
              Популярни
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/rules" 
              className={({ isActive }) => isActive ? "active" : ""}
              onClick={closeMenu}
            >
              Правила
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "active" : ""}
              onClick={closeMenu}
            >
              За bg-tate
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink 
                to="/my-topics" 
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeMenu}
              >
                Моите теми
              </NavLink>
            </li>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => isActive ? "active" : ""}
                  onClick={closeMenu}
                >
                  Вход
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => isActive ? "active" : ""}
                  onClick={closeMenu}
                >
                  Регистрация
                </NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li>
                <NavLink 
                  to="/create" 
                  className={({ isActive }) => isActive ? "active" : ""}
                  onClick={closeMenu}
                >
                  Нова тема
                </NavLink>
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
    </header>
  );
}

export default Navigation;
