import { Link } from "react-router-dom";
import Container from "../components/Container";
import "./NotFound.css";

export default function NotFound() {
  return (
    <Container>
      <section className="page page-center">
        <h1>Страницата не е намерена</h1>
        <p>Страницата, която търсиш, не съществува или е премахната.</p>
        <Link to="/" className="btn-primary">
          Към началната страница
        </Link>
      </section>
    </Container>
  );
}

