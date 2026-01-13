// src/components/layout/Header.jsx
export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Matvey Filatov</div>
        <div className="header-links">
          <a href="https://t.me/MatroskinKo" target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          <a href="https://github.com/MatroskinKot88" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}