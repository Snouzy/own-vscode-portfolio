import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined' && url) {
      const userAgent = window.navigator.userAgent || '';

      // Check if the user is in Instagram's in-app browser
      const isInstagramApp = /Instagram/.test(userAgent);

      if (isInstagramApp) {
        if (/Android/i.test(userAgent)) {
          // Android: Use intent:// to open the link in the default browser
          const intentUrl = `intent://redirect-final?scheme=https;end;`;
          window.location.href = intentUrl;
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
          // iOS: Try x-web-search:// to open external browser and redirect to intermediate page
          const searchUrl = `x-web-search://snouzy.com/redirect-final`;
          window.location.href = searchUrl;

          // Fallback if x-web-search fails
          setTimeout(() => {
            window.location.href = `/redirect-final`;
          }, 300); // Small delay for fallback
        }
      } else {
        // Non-Instagram users: Redirect to the final page directly
        window.location.href = `/redirect-final`;
      }
    }
  }, [url]);

  return <p>Exiting Instagram and redirecting...</p>;
};

export default RedirectPage;
