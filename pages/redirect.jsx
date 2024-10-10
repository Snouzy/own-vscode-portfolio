import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const isInstagramInApp = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return userAgent.includes("Instagram") && userAgent.includes("Android");
    };

    if (isInstagramInApp()) {
      const currentURL = encodeURIComponent(window.location.href);
      window.location.href = `/social-redirect?redirect=${currentURL}`;
    }
  }, [slug]);

  return <p>Chargement...</p>;
};

export default RedirectPage;
