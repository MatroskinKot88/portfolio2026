import './ProjectCard.scss';

export default function ProjectCard({ title, description, liveUrl, codeUrl }) {
  return (
    <div className="project-card">
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-actions">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-live"
            >
              Посмотреть
            </a>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
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