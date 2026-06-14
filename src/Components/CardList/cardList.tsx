import { useCountryStore } from '../../Store/useCountryStore';
import './style.scss';

export function CardList() {
  const cards = useCountryStore((state) => state.cards);

  return (
    <div className="card-form-wrapper" data-testid="cardForm">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${index === cards.length - 1 ? 'last-card' : ''}`}
        >
          <img className="img" src={card.file} alt="Image" />
          <p>
            <i>Name:</i> {card.name}
          </p>
          <p>
            <i>Age:</i> {card.age}
          </p>
          <p>
            <i>Email:</i> {card.email}
          </p>
          <p>
            <i>Country:</i> {card.country}
          </p>
          <p>
            <i>Sex:</i> {card.gender}
          </p>
        </div>
      ))}
    </div>
  );
}
