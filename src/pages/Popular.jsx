import { useEffect, useState } from "react";
import { topicService } from "../services/topicService";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import "./Popular.css";

export default function Popular() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    topicService
      .getAll()
      .then((result) => {
        const withLikes = result.map((t) => ({
          ...t,
          likes: typeof t.likes === "number" ? t.likes : 0,
        }));

        const sorted = withLikes
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 10);

        setTopics(sorted);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Преди малко";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Преди малко";
    if (diffMins < 60) return `Преди ${diffMins} мин`;
    if (diffHours < 24) return `Преди ${diffHours} ч`;
    if (diffDays < 7) return `Преди ${diffDays} дни`;
    return date.toLocaleDateString("bg-BG");
  };

  return (
    <Container>
      <div className="forum-page">
        <div className="forum-header">
          <div className="forum-header-left">
            <h1 className="forum-title">Популярни теми</h1>
            <p className="forum-subtitle">
              Топ 10 теми с най-много харесвания.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="forum-loading">
            <p>Зареждане на най-харесваните теми...</p>
          </div>
        ) : topics.length === 0 ? (
          <div className="forum-empty">
            <p>Все още няма достатъчно данни за популярни теми.</p>
            <p className="forum-empty-subtitle">
              Бъди първият, който хареса тема!
            </p>
          </div>
        ) : (
          <div className="forum-topics">
            <div className="forum-topic-header">
              <div className="forum-topic-title-col">Тема</div>
              <div className="forum-topic-stats-col">Харесвания</div>
              <div className="forum-topic-views-col">Преглеждания</div>
              <div className="forum-topic-last-col">Последен пост</div>
            </div>

            <ul className="forum-topic-list">
              {topics.map((topic) => (
                <li key={topic.id} className="forum-topic-item">
                  <Link to={`/catalog/${topic.id}`} className="forum-topic-link">
                    <div className="forum-topic-avatar">
                      <div className="forum-avatar-circle">
                        {topic.ownerId ? topic.ownerId.charAt(0).toUpperCase() : "U"}
                      </div>
                    </div>
                    <div className="forum-topic-content">
                      <div className="forum-topic-title">{topic.title}</div>
                      <div className="forum-topic-meta">
                        <span className="forum-topic-author">
                          {topic.ownerId || "Анонимен"}
                        </span>
                      </div>
                    </div>
                    <div className="forum-topic-stats">
                      <span className="forum-stat-value">{topic.likes ?? 0}</span>
                      <span className="forum-stat-label">харесвания</span>
                    </div>
                    <div className="forum-topic-views">
                      <span className="forum-stat-value">0</span>
                      <span className="forum-stat-label">преглеждания</span>
                    </div>
                    <div className="forum-topic-last">
                      <div className="forum-last-post">
                        <span className="forum-last-time">
                          {formatDate(topic._createdOn || topic.createdOn)}
                        </span>
                        <span className="forum-last-author">
                          {topic.ownerId ? topic.ownerId.split("@")[0] : "Анонимен"}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
}

