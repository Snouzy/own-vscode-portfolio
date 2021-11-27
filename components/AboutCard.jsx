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
      {/* {data.links.length > 1 &&
          data.links.map((link) => {
            return (
              <Link href={link.link} className={styles[data.title]}>
                <a href={link.link} rel="noopener" target="_blank" className={styles.underline}>
                  {link.name}
                </a>
              </Link>
            );
          })} */}
      {/* <div className={styles.stats}>
        <div>
          <div>
            <WatchIcon className={styles.icon} /> {repo.watchers}
          </div>
          <div>
            <ForkIcon className={styles.icon} /> {repo.forks}
          </div>
          <div>
            <StarIcon className={styles.icon} /> {repo.stargazers_count}
          </div>
        </div>
        <div>
          <a href={repo.html_url} target="_blank" rel="noopener">
            <GithubIcon height={20} width={20} className={styles.icon} />
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener">
              <LinkIcon height={20} width={20} className={styles.icon} />
            </a>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default AboutCard;
