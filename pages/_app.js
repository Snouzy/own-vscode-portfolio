import { useEffect, useState } from 'react';
import I18nProvider from 'next-translate/I18nProvider';
import useTranslation from 'next-translate/useTranslation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../components/Layout';
import Head from '../components/Head';
import '../styles/globals.css';
import '../styles/themes.css';

function MyApp({ Component, pageProps }) {
  const { lang } = useTranslation();

  const [queryClient] = useState(
    () =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 30 * 1000,
                    retry: false
                }
            }
        })
);


  useEffect(() => {
    if (localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
    <Layout>
      <Head title={`Mathias Bradiceanu | ${pageProps.title}`} />
      <I18nProvider lang={lang}>
        <Component {...pageProps} />
      </I18nProvider>
    </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
