import Container from "../components/Container";
import "./Rules.css";

export default function Rules() {
  return (
    <Container>
      <section className="page page-static">
        <h1>Правила на форума</h1>
        <ul>
          <li>Бъди уважителен към останалите потребители.</li>
          <li>Не публикувай обидно, дискриминиращо или незаконно съдържание.</li>
          <li>Пиши по темата и избягвай спам.</li>
          <li>Сигнализирай при нарушение на правилата.</li>
        </ul>
        <p>
          С участието си във форума приемаш тези правила. Целта е да поддържаме
          приятна и безопасна среда за всички.
        </p>
      </section>
    </Container>
  );
}

