// src/pages/AuraAi.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Share2, 
  GitBranch, 
  Palette 
} from 'lucide-react';
import '../styles/pages/_aura-ai.scss';

export default function AuraAi() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
      setEmail('');
    }, 800);
  };

  return (
    <div className="aura-ai">
      <header className="aura-header">
        <div className="logo">Aura<span style={{ color: '#d0b3ff' }}>AI</span></div>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Назад
        </button>
      </header>

 <section className="hero">
  <div className="hero-overlay"></div>
  <div className="container">
    <h1>Design from Text</h1>
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
</section>

      <section className="services">
        <div className="container">
          <h2>Возможности</h2>
          <div className="services-grid">
            {[
              { icon: <Palette size={32} />, title: 'UI Generation', desc: 'AI создаёт макет на основе текстового описания' },
              { icon: <Code size={32} />, title: 'Code Export', desc: 'Экспорт в React, Vue или HTML/CSS' },
              { icon: <Share2 size={32} />, title: 'Team Sharing', desc: 'Делитесь проектами с командой в один клик' },
              { icon: <GitBranch size={32} />, title: 'Version History', desc: 'Откатывайтесь к любой версии дизайна' }
            ].map((item, i) => (
              <div className="service-card" key={i}>
                <div className="service-icon">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <h2>Готовы создавать быстрее?</h2>
          <button 
            className="cta-button"
            onClick={() => document.querySelector('.cta-form').scrollIntoView({ behavior: 'smooth' })}
          >
            Начать сейчас
          </button>
        </div>
      </section>
    </div>
  );
}