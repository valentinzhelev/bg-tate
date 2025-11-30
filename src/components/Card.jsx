import "./Card.css";

function Card({ children, className = "", onClick, hover = false }) {
  const cardClass = `card ${hover ? 'card-hover' : ''} ${className}`.trim();
  
  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;

