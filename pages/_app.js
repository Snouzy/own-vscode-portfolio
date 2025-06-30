import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import I18nProvider from 'next-translate/I18nProvider';
import useTranslation from 'next-translate/useTranslation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../components/Layout';
import LayoutSimple from '../components/LayoutSimple';
import Head from '../components/Head';
import '../styles/globals.css';
import '../styles/themes.css';

function MyApp({ Component, pageProps }) {
  const { lang } = useTranslation();
  const router = useRouter();

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

  // exclude pages from layout
  const pagesWithoutLayout = ['/prompts', '/pense-bete-sg'];
  const shouldShowLayout = !pagesWithoutLayout.includes(router.pathname);

  const content = (
    <QueryClientProvider client={queryClient}>
      <Head title={`Mathias Bradiceanu | ${pageProps.title}`} />
      <I18nProvider lang={lang}>
        <Component {...pageProps} />
      </I18nProvider>
    </QueryClientProvider>
  );

  if (shouldShowLayout) {
    return (
      <Layout>
        {content}
      </Layout>
    );
  }

  return <LayoutSimple>{content}</LayoutSimple>;
}

export default MyApp;

