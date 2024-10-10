import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();
  const { slug } = router.query;  // Pour obtenir le {slug} dynamique

  useEffect(() => {
    const isInAppBrowser = () => {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      // Détection des in-app browsers (Instagram, Facebook, Messenger, etc.)
      return /instagram|fb_iab|fb4a|messenger/i.test(ua);
    };

    if (isInAppBrowser()) {
      // Si c'est un in-app browser, rediriger vers le navigateur par défaut
      window.location.href = `https://google.com`;
    } else {
      // Redirection classique
      window.location.href = `https://google.com`;
    }
  }, [slug]);

  return <p>Redirection en cours...</p>;
};

export default RedirectPage;
