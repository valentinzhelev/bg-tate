import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import heroImage from "../assets/hero-image.png";
import "./Home.css";

export default function Home() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            <section className="hero">
                <div className="hero-inner">
                    <div className="hero-content">
                        <p className="hero-kicker">За бащи и мъже</p>
                        <h1 className="hero-title">
                            Добре дошли в<br />
                            BG-Tate
                        </h1>
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
                    <div className="hero-media">
                        <img 
                            src={heroImage} 
                            alt="Баща с две деца" 
                            className="hero-image"
                        />
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-inner">
                    <div className="stats-grid">
                        <article className="stats-card">
                            <p className="stats-value">100+</p>
                            <p className="stats-label">Активни потребители</p>
                        </article>
                        <article className="stats-card stats-card-primary">
                            <p className="stats-value">500+</p>
                            <p className="stats-label">Теми за дискусия</p>
                        </article>
                        <article className="stats-card">
                            <p className="stats-value">24/7</p>
                            <p className="stats-label">Достъпност</p>
                        </article>
                    </div>
                </div>
            </section>

            <Container>
                <div className="home-page">

                <section className="home-features">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="48" height="48" rx="12" fill="#0D9488" opacity="0.1"/>
                                <path d="M24 16L28 24L36 25L30 31L31 39L24 35L17 39L18 31L12 25L20 24L24 16Z" fill="#0D9488"/>
                            </svg>
                        </div>
                        <h3>Отглеждане на деца</h3>
                        <p>Споделяй опит и получавай съвети за отглеждането на децата. Всеки баща има нещо ценно да сподели.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="48" height="48" rx="12" fill="#0D9488" opacity="0.1"/>
                                <circle cx="24" cy="24" r="8" fill="#0D9488"/>
                                <path d="M24 12V24L32 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <h3>Взаимна подкрепа</h3>
                        <p>Тук можеш да говориш свободно за трудните моменти. Няма да те съдят или нарекат "слаб" - тук всички разбират.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="48" height="48" rx="12" fill="#0D9488" opacity="0.1"/>
                                <path d="M16 24L22 30L32 18" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h3>Съвети за живота</h3>
                        <p>Получавай и давай съвети за всичко - от работа до отношения. Мъжете също се нуждаят от подкрепа.</p>
                    </div>
                </section>

                <section className="home-info">
                    <h2>Защо BG-Tate?</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4>Безопасно пространство</h4>
                            <p>Тук можеш да говориш свободно без да те съдят. Мъжете също имат нужда от подкрепа и разбиране.</p>
                        </div>
                        <div className="info-card">
                            <h4>Разбиране и емпатия</h4>
                            <p>Всички тук разбират предизвикателствата на бащинството и живота. Няма "трябва да си силен" - тук всички си помагаме.</p>
                        </div>
                        <div className="info-card">
                            <h4>Взаимна подкрепа</h4>
                            <p>Споделяй опит, получавай съвети и давай подкрепа. Заедно сме по-силни - и като бащи, и като мъже.</p>
                        </div>
                        <div className="info-card">
                            <h4>Фокус върху бащите</h4>
                            <p>Платформа специално създадена за бащи, вдъхновена от BG-Mamma, но посветена на мъжете и техните нужди.</p>
                        </div>
                    </div>
                </section>
                </div>
            </Container>
        </>
    );
}