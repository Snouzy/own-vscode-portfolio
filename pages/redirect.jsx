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
          // Android: Use intent:// to force the link to open in Chrome or the default browser
          const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;end;`;
          window.location.href = intentUrl;
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
          // iOS: Combine x-web-search with a fallback URL to open in the native browser
          const fallbackUrl = `https://${url}`;
          const redirectScript = `
            var searchIntent = 'x-web-search://${url}';
            window.location.href = searchIntent;
            setTimeout(function() {
              window.location.href = '${fallbackUrl}';
            }, 100); // Small delay as a fallback if the search scheme doesn't work
          `;
          document.write(`<script>${redirectScript}</script>`);
        }
      } else {
        // Non-Instagram users: Open the URL normally
        window.location.href = `https://${url}`;
      }
    }
  }, [url]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
