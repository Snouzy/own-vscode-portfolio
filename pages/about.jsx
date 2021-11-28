import useTranslation from 'next-translate/useTranslation';

import AboutLanguages from '../components/AboutLanguages';
import AboutFrameworks from '../components/AboutFrameworks';
import Accordion from '../components/Accordion';

import { getAbout } from './api/about';
import { normalize } from '../utils/common.ts';

import styles from '../styles/AboutPage.module.css';

const accordionData = [
  {
    id: 1,
    name: 'vazee',
  },
  {
    id: 2,
    name: 'netty',
  },
  {
    id: 3,
    name: 'freelance',
  },
  {
    id: 4,
    name: 'army',
  },
];

const AboutPage = ({ data }) => {
  const { t } = useTranslation('about');

  return (
    <>
      <h1>{t('title')}</h1>

      <div className={styles.experiences}>
        <h2>{t('experiences')}</h2>
        <Accordion data={accordionData} />
      </div>

      <div className={styles.container}>
        <AboutLanguages data={data.languages} />
        <AboutFrameworks data={data.frameworks} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const data = getAbout();

  return {
    props: { title: 'About', data: normalize(data, 'title') },
  };
}

export default AboutPage;
