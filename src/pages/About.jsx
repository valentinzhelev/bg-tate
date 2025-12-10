import Container from "../components/Container";
import "./About.css";

export default function About() {
  return (
    <Container>
      <section className="page page-static">
        <h1>За bg-tate</h1>
        <p>
          bg-tate е малък форум, вдъхновен от общностни сайтове, където хората
          могат да споделят мнения, истории и съвети. Проектът е изграден като
          част от изпит по ReactJS в СофтУни.
        </p>
        <p>
          Целта му е да демонстрира работа с SPA, навигация, потребителска
          автентикация и пълен CRUD върху теми във форума.
        </p>
      </section>
    </Container>
  );
}

