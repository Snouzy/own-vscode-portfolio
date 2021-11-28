import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import WatchIcon from '../components/icons/WatchIcon';
import ForkIcon from '../components/icons/ForkIcon';
import StarIcon from '../components/icons/StarIcon';
import GithubIcon from '../components/icons/GithubIcon';
import LinkIcon from '../components/icons/LinkIcon';
import styles from '../styles/AboutCard.module.css';

const AboutCard = ({ title, children }) => {
  const { t } = useTranslation('about');
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{t(title)}</h3>
        {children}
      </div>
    </div>
  );
};

export default AboutCard;
