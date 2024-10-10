import { useEffect } from 'react';
import { useRouter } from 'next/router';
const RedirectPage = () => {
  const router = useRouter();
  const { slug } = router.query;



  useEffect(() => {
    const isInAppBrowser = () => {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        // Détecter Instagram ou d'autres in-app browsers
        return /instagram|fb_iab|fb4a|messenger/i.test(ua);
      };

    if (isInAppBrowser()) {
      // Affiche un message indiquant à l'utilisateur d'ouvrir le lien dans son navigateur
      document.getElementById('open-browser-btn').style.display = 'block';
    } else {
      // Redirection classique si pas dans un in-app browser
      window.location.href = `https://mylinks/${slug}.com`;
    }
  }, [slug]);

  const openInDefaultBrowser = () => {
    window.open(`https://mylinks/${slug}.com`, '_blank');
  };

  return (
    <div>
      <p>Redirection en cours...</p>
    
      <a href="https://snouzy.com/nibrowser=no" target='_blank' download>Open in browser</a>
      <button
        id="open-browser-btn"
        style={{ display: 'none' }}
        onClick={openInDefaultBrowser}
      >
        Ouvrir dans le navigateur
      </button>
    </div>
  );
};

export default RedirectPage;
