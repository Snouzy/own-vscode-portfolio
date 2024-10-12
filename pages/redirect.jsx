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
          const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;end;`;
          window.location.href = intentUrl;

          // Fallback to ensure redirection
          setTimeout(() => {
            window.location.href = `https://${url}`;
          }, 300); // Fallback after 300ms
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
          // iOS: Use x-web-search:// trick to trigger shortcut and fallback
          const searchUrl = `x-web-search://${url}`;
          window.location.href = searchUrl;

          // If the x-web-search doesn't work, trigger a custom shortcut
          setTimeout(() => {
            window.location.href = `shortcuts://run-shortcut?name=OpenInBrowser&input=https://${url}`;
          }, 300); // Trigger Apple Shortcut as a fallback
        }
      } else {
        // Non-Instagram users: Open the landing page directly
        window.location.href = `https://${url}`;
      }
    }
  }, [url]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
