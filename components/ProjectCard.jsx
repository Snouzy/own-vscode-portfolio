import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import styles from '../styles/ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const { t, lang } = useTranslation('projects');

  return (
    <div className={styles.card}>
      <Image src={project.image} height={300} width={600} alt={project.title} />
      <div className={styles.content}>
        <h3>{project.title}</h3>
        <h4>{t(`${project.name}.subtitle`)}</h4>
        <p>
          <Trans i18nKey={`projects:${project.name}.description`} components={[<br />]} />
        </p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.cta}>
          {project.source_code && (
            <a href={project.source_code} target="_blank" rel="noopener" className={styles.underline}>
              {t('source_code')}
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener" className={styles.underline}>
              {t('live_demo')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
