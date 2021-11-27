import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import AboutLanguages from '../components/AboutLanguages';
import AboutFrameworks from '../components/AboutFrameworks';
import AboutCard from '../components/AboutCard';

import { getAbout } from './api/about';
import { normalize } from '../utils/common.ts';

import styles from '../styles/AboutPage.module.css';

const LinkComponent = ({ children }) => {
  return (
    <Link href="https://vazeepro.com">
      <a href="https://vazeepro.com" rel="noopener" target="_blank" className={styles.underline}>
        {children}
      </a>
    </Link>
  );
};
const AboutPage = ({ data }) => {
  const { t } = useTranslation('about');

  return (
    <>
      <h1>{t('title')}</h1>

      <div className={styles.experiences}>
        <h2>{t('experiences')}</h2>

        <p>
          <Trans i18nKey="about:experiences-description" components={[<br />, <LinkComponent />]} />
        </p>
      </div>

      <div className={styles.container}>
        {/* <AboutCard title={data.age.title} key={data.id}>
          <p className={styles.age}>{t(data.age.description)}</p>
        </AboutCard> */}
        <AboutLanguages data={data.languages} />
        <AboutFrameworks data={data.frameworks} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const data = getAbout();
  console.log('data:', data);
  console.log('data:', normalize(data, 'title'));

  return {
    props: { title: 'About', data: normalize(data, 'title') },
  };
}

export default AboutPage;
