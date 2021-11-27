import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import Illustration from '../components/Illustration';
import styles from '../styles/HomePage.module.css';

export default function HomePage() {
  const { t } = useTranslation('home');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <h1>
            <Trans i18nKey="home:title" components={[<br />]} />
          </h1>
        </div>
        <div className={styles.foreground}>
          <div className={styles.content}>
            <h1 className={styles.name}>Mathias Bradiceanu</h1>
            <h6 className={styles.bio}>{t('role')}</h6>

            <div className={styles.buttonsContainer}>
              <Link href="/projects">
                <button className={styles.button}>{t('view_work')}</button>
              </Link>
              <Link href="/contact">
                <button className={styles.outlined}>{t('contact_me')}</button>
              </Link>
            </div>
          </div>
          <Illustration className={styles.illustration} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { title: 'Home' },
  };
}
