import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { topicService } from "../services/topicService";
import Container from "../components/Container";
import "./MyTopics.css";

export default function MyTopics() {
  const { user } = useContext(AuthContext);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    topicService
      .getAll()
      .then((result) => {
        const mine = result.filter((t) => t.ownerId === user.email);
        setTopics(mine);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [user.email]);

  if (isLoading) {
    return (
      <Container>
        <section className="page">
          <p>Зареждане на твоите теми...</p>
        </section>
      </Container>
    );
  }

  if (topics.length === 0) {
    return (
      <Container>
        <section className="page">
          <h1>Моите теми</h1>
          <p>Все още нямаш създадени теми.</p>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="page">
        <h1>Моите теми</h1>
        <ul className="topic-list">
          {topics.map((topic) => (
            <li key={topic.id} className="topic-list-item">
              <Link to={`/catalog/${topic.id}`} className="topic-link">
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

