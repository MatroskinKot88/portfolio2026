import './ProjectCard.scss';
import { Link } from 'react-router-dom';

export default function ProjectCard({ title, description, liveUrl, codeUrl, isExternal = true }) {
  const renderLiveLink = () => {
    if (!liveUrl) return null;

    if (isExternal) {
      return (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-live"
        >
          Посмотреть
        </a>
      );
    } else {
      return (
        <Link to={liveUrl} className="btn-live">
          Посмотреть
        </Link>
      );
    }
  };

  return (
    <div className="project-card">
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-actions">
          {renderLiveLink()}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_ blank"
              rel="noopener noreferrer"
              className="btn-code"
            >
              Код
            </a>
          )}
        </div>
      </div>
    </div>
  );
}