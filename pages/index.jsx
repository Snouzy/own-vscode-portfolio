import Link from 'next/link';
import Image from 'next/image';

import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const { t } = useTranslation('home');

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <svg width="24" height="24" viewBox="0 0 24 24" className={styles.icon}>
          <path fill="currentColor" d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/>
        </svg>
      </nav>
      
      <main className={styles.content}>
        <h1 className={styles.name}>Mathias Bradiceanu</h1>
        <h2 className={styles.bio}>{t('role')}</h2>

        <div className={styles.buttonsContainer}>
          <Link href="/projects" className={styles.button}>
            <svg width="16" height="16" viewBox="0 0 16 16" className={styles.buttonIcon}>
              <path fill="currentColor" d="M4.5 3h7V2h-7v1zm7 3h-7V5h7v1zm-7 3h7V8h-7v1zm7 3h-7v-1h7v1z"/>
            </svg>
            {t('view_work')}
          </Link>
          <Link href="/contact" className={styles.outlined}>
            <svg width="16" height="16" viewBox="0 0 16 16" className={styles.buttonIcon}>
              <path fill="currentColor" d="M1.5 1h13l.5.5v10l-.5.5H7.707l-2.853 2.854L4 14.5V12H1.5l-.5-.5v-10l.5-.5zm13 10V2H2v9h2.5l.5.5v1.793l2.146-2.147L7.5 11h7z"/>
            </svg>
            {t('contact_me')}
          </Link>
        </div>

        <div className={styles.illustration}>
          <Image 
            src="/me-removebg.png" 
            alt="A picture of me" 
            height={300} 
            width={290}
            quality={95}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  return {
    props: { title: 'Home' },
  };
}
