// src/pages/Home.jsx
import { useState } from 'react';
import Header from '../components/layout/Header';
import ProjectCard from '../components/ui/ProjectCard';
import '../styles/pages/_home.scss';
import useOnScreen from '../hooks/useOnScreen';

export default function Home() {
  const [heroRef, heroVisible] = useOnScreen({ theshold: 0.1, once: true});
  const [skillsRef, skillsVisible] = useOnScreen({treshold: 0.1, once: true});
  const [projectsRef, projectsVisible] = useOnScreen({ threshold: 0.1, once: true });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Закрытие по нажатию Esc
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  return (
    <div className="home">
      <Header />

      {/* Hero */}
      <section className={`hero ${heroVisible ? 'animate' : ''}`}
      ref={heroRef}
      >
        {/* Аватар */}
        <div className="avatar-container" onClick={openModal}>
          <img
            src="/images/avatar.jpg"
            alt="Matvey"
            className="avatar"
          />
          <div className="avatar-overlay">
            <span className="zoom-icon">🔍</span>
          </div>
        </div>

        <h1>Привет, я Матвей</h1>
        <p className="role">Frontend-разработчик • Prompt Engineer • Web Designer</p>
        <p className="about">
          Создаю современные веб-интерфейсы, проектирую UX/UI и применяю AI для решения бизнес-задач.
          Ищу позицию с зарплатой от 120 000 ₽. Рассматриваю разные способы сотрудничества, как удалёенный формат, так и на месте работадателя.
        </p>
      </section>

      {/* Скилы */}
      <section className={`skills ${skillsVisible ? 'animate' : ''}`}
      ref={skillsRef}
      >
        <h2>Навыки</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul>
              <li>HTML / CSS / SCSS</li>
              <li>JavaScript (ES6+)</li>
              <li>React, Vite</li>
              <li>Адаптивная вёрстка</li>
              <li>Интерактивные анимации</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Prompt Engineering</h3>
            <ul>
              <li>Структурирование промтов</li>
              <li>Тестирование LLM (GPT, Claude)</li>
              <li>Автоматизация через Telegram-ботов</li>
              <li>Генерация кода и контента</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Web Design</h3>
            <ul>
              <li>UI/UX проектирование</li>
              <li>Градиенты, glassmorphism</li>
              <li>Typography & spacing</li>
              <li>Figma → код</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Проекты */}
      <section className={`projects ${projectsVisible ? 'animate' : ''}`}
      ref={projectsRef}
      >
        <h2>Проекты</h2>
        <div className="projects-grid">
          <ProjectCard
            title="BarCraft Pro"
            description="Лендинг для производства барных станций из пищевой нержавейки."
            liveUrl="https://barcraftstation2.vercel.app"
            codeUrl="https://github.com/MatroskinKot88/barCraftStation"
          />
          <ProjectCard
            title="Prompt Lab"
            description="Интерактивная галерея эффективных промтов."
            liveUrl="#"
          />
          <ProjectCard
            title="Aura AI"
            description="Концепт SaaS: генерация UI по тексту."
            liveUrl="#"
          />
          <ProjectCard
            title="Nocturne Bar"
            description="Дизайн-концепт коктейльного бара."
            liveUrl="#"
          />
        </div>
      </section>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal} onKeyDown={handleKeyDown} tabIndex={0}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src="/images/avatar.jpg" alt="Matvey full" className="modal-image" />
            <button className="modal-close" onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}