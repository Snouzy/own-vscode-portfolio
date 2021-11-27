import { useEffect } from 'react';
import I18nProvider from 'next-translate/I18nProvider';
import useTranslation from 'next-translate/useTranslation';

import Layout from '../components/Layout';
import Head from '../components/Head';
import '../styles/globals.css';
import '../styles/themes.css';

function MyApp({ Component, pageProps }) {
  const { lang } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    }
  }, []);

  return (
    <Layout>
      <Head title={`Mathias Bradiceanu | ${pageProps.title}`} />
      <I18nProvider lang={lang}>
        <Component {...pageProps} />
      </I18nProvider>
    </Layout>
  );
}

export default MyApp;
