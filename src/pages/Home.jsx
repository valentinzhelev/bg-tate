import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import "./Home.css";

export default function Home() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <section className="hero">
                <div className="hero-inner container">
                    <div className="hero-text-block">
                        <p className="hero-kicker">За бащи и мъже</p>
                        <h1 className="hero-title">Добре дошли в BG-Tate</h1>
                        <p className="hero-lead">
                            Платформа за бащи, които искат да споделят опит, да получат подкрепа и
                            да си помагат взаимно. Тук можеш да говориш свободно за отглеждането на
                            децата, за трудните моменти в живота и за всичко, за което понякога е
                            трудно да попиташ.
                        </p>
                        <div className="hero-actions">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/catalog" className="btn-primary">
                                        Разгледай форума
                                    </Link>
                                    <Link to="/register" className="btn-outline">
                                        Започни сега
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/catalog" className="btn-primary">
                                        Разгледай форума
                                    </Link>
                                    <Link to="/create" className="btn-outline">
                                        Създай тема
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stats-card">
                        <div className="stat-number">100+</div>
                        <div className="stat-label">Активни потребители</div>
                    </div>
                    <div className="stats-card">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Теми за дискусия</div>
                    </div>
                    <div className="stats-card">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Достъпност</div>
                    </div>
                </div>
            </section>

            <Container>
                <div className="home-page">

                <section className="home-features">
                    <Card>
                        <div className="feature-icon">👨‍👧‍👦</div>
                        <h3>Отглеждане на деца</h3>
                        <p>Споделяй опит и получавай съвети за отглеждането на децата. Всеки баща има нещо ценно да сподели.</p>
                    </Card>
                    <Card>
                        <div className="feature-icon">💪</div>
                        <h3>Взаимна подкрепа</h3>
                        <p>Тук можеш да говориш свободно за трудните моменти. Няма да те съдят или нарекат "слаб" - тук всички разбират.</p>
                    </Card>
                    <Card>
                        <div className="feature-icon">🤝</div>
                        <h3>Съвети за живота</h3>
                        <p>Получавай и давай съвети за всичко - от работа до отношения. Мъжете също се нуждаят от подкрепа.</p>
                    </Card>
                </section>

                <section className="home-info">
                    <h2>Защо BG-Tate?</h2>
                    <div className="info-grid">
                        <Card>
                            <h4>🛡️ Безопасно пространство</h4>
                            <p>Тук можеш да говориш свободно без да те съдят. Мъжете също имат нужда от подкрепа и разбиране.</p>
                        </Card>
                        <Card>
                            <h4>💬 Разбиране и емпатия</h4>
                            <p>Всички тук разбират предизвикателствата на бащинството и живота. Няма "трябва да си силен" - тук всички си помагаме.</p>
                        </Card>
                        <Card>
                            <h4>🤝 Взаимна подкрепа</h4>
                            <p>Споделяй опит, получавай съвети и давай подкрепа. Заедно сме по-силни - и като бащи, и като мъже.</p>
                        </Card>
                        <Card>
                            <h4>👨‍👧‍👦 Фокус върху бащите</h4>
                            <p>Платформа специално създадена за бащи, вдъхновена от BG-Mamma, но посветена на мъжете и техните нужди.</p>
                        </Card>
                    </div>
                </section>
                </div>
            </Container>
        </>
    );
}