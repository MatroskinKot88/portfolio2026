// src/pages/NocturneBar.jsx
import { useNavigate } from 'react-router-dom';
import '../styles/pages/_nocturne-bar.scss';

// Данные меню
const DRINKS = [
  {
    name: "Midnight Sour",
    ingredients: "Бурбон, лимон, яичный белок, ангостура",
    price: "350 ₽"
  },
  {
    name: "Black Forest",
    ingredients: "Вишнёвая настойка, шоколадный ликёр, сливки",
    price: "350 ₽"
  },
  {
    name: "Smoke & Spice",
    ingredients: "Мескаль, имбирный сироп, лайм, чили",
    price: "350 ₽"
  },
  {
    name: "Golden Hour",
    ingredients: "Джин, персиковый вермут, апельсин, шампанское",
    price: "450 ₽"
  }
];

export default function NocturneBar() {
  const navigate = useNavigate();

  return (
    <div className="nocturne-bar">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Nocturne</h1>
          <p className="subtitle">Тёмные коктейли. Глубокие вкусы. Москва.</p>
          <button className="cta-button" onClick={() => {
            window.location.href = 'tel:+79991234567';
          }}>
            Забронировать стол
          </button>
        </div>
      </section>

      {/* Menu */}
      <section className="menu">
        <div className="container">
          <h2>Напитки</h2>
          <div className="menu-grid">
            {DRINKS.map((drink, index) => (
              <div className="menu-item" key={index}>
                <div className="drink-header">
                  <h3>{drink.name}</h3>
                  <span className="price">{drink.price}</span>
                </div>
                <p className="ingredients">{drink.ingredients}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambience */}
      <section className="ambience">
        <div className="container">
          <h2>Атмосфера</h2>
          <p>
            Приглушённый свет, джаз и deep house, бархатные диваны и стены из тёмного дерева. 
            Nocturne — место, где время замедляется, а вкус раскрывается слоями.
          </p>
        </div>
      </section>

      {/* Promo */}
      <section className="promo">
        <div className="container">
          <div className="promo-card">
            <h3>Акция</h3>
            <p>Закажи 5 шотов настоек — получи 6-й в подарок</p>
            <p className="small">Также в наличии: крафтовое пиво, вино, лёгкие закуски</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>Телефон: <a href="tel:+79991234567">+7 (999) 123-45-67</a></p>
          <p>
            <a href="https://t.me/MatroskinKot88" target="_blank" rel="noopener noreferrer">Telegram</a> • 
            <a href="https://instagram.com/your_bar" target="_blank" rel="noopener noreferrer">Instagram</a>
          </p>
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Назад к портфолио
          </button>
        </div>
      </footer>
    </div>
  );
}