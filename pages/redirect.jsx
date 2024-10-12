import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined' && url) {
      const userAgent = window.navigator.userAgent || '';

      // Check if user is in Instagram's in-app browser
      const isInstagramApp = /Instagram/.test(userAgent);

      if (isInstagramApp) {
        if (/Android/i.test(userAgent)) {
          // Android: Use intent:// to open the link in the default browser with a fallback to the landing page
          const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;end;`;
          window.location.href = intentUrl;
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
          // iOS: Use x-web-search:// trick and redirect to the desired landing page
          const searchUrl = `x-web-search://${url}`;
          window.location.href = searchUrl;

          // Fallback to the landing page after a slight delay
          setTimeout(() => {
            window.location.href = `https://${url}`;
          }, 150); // Slight delay for fallback
        }
      } else {
        // If not Instagram, open the landing page normally
        window.location.href = `https://${url}`;
      }
    }
  }, [url]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
