// src/pages/PromptLab.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/_prompt-lab.scss';

// Данные: промты по категориям
const INITIAL_PROMPTS = [
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
  const navigate = useNavigate();

  const [prompts, setPrompts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [newPrompt, setNewPrompt] = useState({
    category: CATEGORIES[0],
    title: '',
    description: '',
    prompt: ''
  });

    // Загрузка при старте
  useEffect(() => {
    const saved = localStorage.getItem('promptLab_prompts');
    if (saved) {
      try {
        setPrompts(JSON.parse(saved));
      } catch (e) {
        setPrompts(INITIAL_PROMPTS);
        localStorage.setItem('promptLab_prompts', JSON.stringify(INITIAL_PROMPTS));
      }
    } else {
      setPrompts(INITIAL_PROMPTS);
      localStorage.setItem('promptLab_prompts', JSON.stringify(INITIAL_PROMPTS));
    }
  }, []);

    // Сохранение в localStorage при изменении
 useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('promptLab_prompts', JSON.stringify(prompts));
    }
  }, [prompts]);


  // Функция копирования
  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Не удалось скопировать:', err);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewPrompt({
      category: CATEGORIES[0],
      title: '',
      description: '',
      prompt: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrompt(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPrompt.title.trim() || !newPrompt.prompt.trim()) {
      return;
    }

    const promptToAdd = {
      id: Date.now(),
      category: newPrompt.category,
      title: newPrompt.title,
      description: newPrompt.description,
      prompt: newPrompt.prompt
    };

    setPrompts(prev => [promptToAdd, ...prev]);
    closeModal();
  };

    // Фильтрация — вынесена как обычная переменная внутри render
  let filteredPrompts = [];
  if (activeCategory === 'Все') {
    filteredPrompts = prompts;
  } else {
    filteredPrompts = prompts.filter(p => p.category === activeCategory);
  }

  // Удаление промта
const handleDelete = (id) => {
  const confirmed = window.confirm('Вы уверены, что хотите удалить этот промт?');
  if (!confirmed) return;

  setPrompts(prev => prev.filter(p => p.id !== id));
};
  

  return (
    <div className="prompt-lab">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Назад к портфолио
        </button>

        <h1>Prompt Lab</h1>
        <p className="subtitle">Интерактивная галерея эффективных промтов для разработки, бизнеса и креатива</p>

        {/* Кнопка добавления */}
        <div className="actions-bar">
          <button className="add-prompt-btn" onClick={openModal}>
            + Добавить промт
          </button>
        </div>

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
    
    <div className="prompt-actions">
      <button
        className="copy-btn"
        onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
      >
        {copiedId === prompt.id ? 'Скопировано!' : 'Скопировать'}
      </button>
      
      {/* Кнопка удаления — только если id >= 1000000000 (пользовательские) */}
      {prompt.id > 999999999 && (
        <button
          className="delete-btn"
          onClick={() => handleDelete(prompt.id)}
          title="Удалить промт"
        >
          Удалить
        </button>
      )}
    </div>
  </div>
))}
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Добавить новый промт</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Категория</label>
                <select
                  name="category"
                  value={newPrompt.category}
                  onChange={handleInputChange}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Название *</label>
                <input
                  type="text"
                  name="title"
                  value={newPrompt.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
                <div className="form-group">
                <label>Описание</label>
                <input
                  type="text"
                  name="description"
                  value={newPrompt.description}
                  onChange={handleInputChange}
                />
              </div>

               
              <div className="form-group">
                <label>Промт *</label>
                <textarea
                  name="prompt"
                  value={newPrompt.prompt}
                  onChange={handleInputChange}
                  rows="5"
                  required
                />
              </div>

               
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Отмена
                </button>
                <button type="submit" className="btn-submit">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}