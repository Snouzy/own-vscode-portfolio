import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

import styles from '../styles/ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const { t, lang } = useTranslation('projects');

  return (
    <motion.div 
      className={styles.card}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={styles.imageWrapper}>
        <Image 
          src={project.image} 
          height={300} 
          width={600} 
          alt={project.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <h4 className={styles.subtitle}>{t(`${project.name}.subtitle`)}</h4>
        <p className={styles.description}>
          <Trans i18nKey={`projects:${project.name}.description`} components={[<br />]} />
        </p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={`${styles.tag} ${tag}`}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.cta}>
          {project.source_code && (
            <motion.a 
              href={project.source_code} 
              target="_blank" 
              rel="noopener"
              className={styles.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub className={styles.icon} />
              {t('source_code')}
            </motion.a>
          )}
          {project.demo && (
            <motion.a 
              href={project.demo} 
              target="_blank" 
              rel="noopener"
              className={`${styles.button} ${styles.primary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiExternalLink className={styles.icon} />
              {t('live_demo')}
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
