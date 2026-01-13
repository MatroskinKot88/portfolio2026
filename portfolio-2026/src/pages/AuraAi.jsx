// src/pages/AuraAi.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Layout, Zap, Eye } from 'lucide-react';
import '../styles/pages/_aura-ai.scss';

export default function AuraAi() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Здесь можно отправить email в Telegram через BotFarm
    // Пока просто имитация
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
      setEmail('');
    }, 800);
  };

  return (
    <div className="aura-ai">
      {/* Header */}
      <header className="aura-header">
        <div className="container">
          <div className="logo">Aura<span className="logo-accent">AI</span></div>
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Назад
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Design from <span className="highlight">text</span></h1>
            <p className="subtitle">
              Опишите интерфейс простым текстом — получите готовый макет в Figma за 10 секунд.
            </p>
            <form onSubmit={handleSubmit} className="cta-form">
              <input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Попробовать бесплатно'}
              </button>
            </form>
            {isSuccess && <p className="success-message">Спасибо! Приглашение отправлено.</p>}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2>Как это работает</h2>
          <div className="features-grid">
            {[
              { icon: <Layout size={28} />, title: 'Опишите', desc: 'Напишите, что хотите видеть на экране' },
              { icon: <Sparkles size={28} />, title: 'Сгенерируйте', desc: 'AI создаст макет за секунды' },
              { icon: <Zap size={28} />, title: 'Экспортируйте', desc: 'Получите ссылку на Figma' },
              { icon: <Eye size={28} />, title: 'Итерируйте', desc: 'Правьте промт — обновляйте дизайн' }
            ].map((item, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Готовы ускорить дизайн?</h2>
          <button className="cta-button" onClick={() => document.querySelector('.cta-form').scrollIntoView({ behavior: 'smooth' })}>
            Начать сейчас
          </button>
        </div>
      </section>
    </div>
  );
}