// src/pages/PromptLab.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/_prompt-lab.scss';

// Данные: промты по категориям
const PROMPTS = [
  {
    id: 1,
    category: 'Frontend',
    title: 'Генерация React-компонента',
    description: 'Создаёт функциональный компонент с props и стилями',
    prompt: `Создай компонент React на TypeScript для карточки товара. 
Он должен принимать props: title (string), price (number), image (string).
Используй SCSS-модули. Добавь hover-эффект на кнопку "В корзину".
Не используй сторонние библиотеки.`
  },
  {
    id: 2,
    category: 'Marketing',
    title: 'Продающий текст для лендинга',
    description: 'Генерирует заголовок и подзаголовок для SaaS',
    prompt: `Напиши продающий заголовок и подзаголовок для AI-сервиса, 
который автоматизирует создание портфолио для junior-разработчиков.
Целевая аудитория: студенты и career switchers. Тон — вдохновляющий, но конкретный.`
  },
  {
    id: 3,
    category: 'Design',
    title: 'UI-описание для Figma',
    description: 'Преобразует идею в детальное описание для дизайнера',
    prompt: `Опиши макет главной страницы для сервиса "Prompt Lab". 
Стиль: dark mode, glassmorphism, фиолетово-индиговые акценты. 
Разделы: Hero, фильтры, карточки промтов, футер. 
Добавь микроанимации при наведении.`
  },
  {
    id: 4,
    category: 'Business',
    title: 'Бизнес-модель для барных станций',
    description: 'Генерирует стратегию монетизации',
    prompt: `Разработай бизнес-модель для производства барных станций в России. 
Учти: себестоимость ≤100₽, отпускная цена 350₽, формат 5+1, доп. продажи (пиво, снеки). 
Как выйти в плюс за 3 месяца?`
  },
  {
    id: 5,
    category: 'Creative',
    title: 'Креативный коктейльный рецепт',
    description: 'Генерирует уникальный напиток с историей',
    prompt: `Придумай коктейль в стиле "киберпанк". 
Название, состав (5 ингредиентов), способ подачи, короткая история. 
Безалкогольный вариант обязателен.`
  }
];

const CATEGORIES = ['Все', 'Frontend', 'Marketing', 'Design', 'Business', 'Creative'];

export default function PromptLab() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [copiedId, setCopiedId] = useState(null);
  const navigate = useNavigate();

  const filteredPrompts = activeCategory === 'Все'
    ? PROMPTS
    : PROMPTS.filter(p => p.category === activeCategory);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Не удалось скопировать:', err);
    }
  };

  return (
    <div className="prompt-lab">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Назад к портфолио
        </button>

        <h1>Prompt Lab</h1>
        <p className="subtitle">Интерактивная галерея эффективных промтов для разработки, бизнеса и креатива</p>

        {/* Фильтры */}
        <div className="filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Карточки */}
        <div className="prompts-grid">
          {filteredPrompts.map(prompt => (
            <div className="prompt-card" key={prompt.id}>
              <span className="category-badge">{prompt.category}</span>
              <h3>{prompt.title}</h3>
              <p className="description">{prompt.description}</p>
              <pre className="prompt-text">{prompt.prompt}</pre>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
              >
                {copiedId === prompt.id ? 'Скопировано!' : 'Скопировать промт'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}