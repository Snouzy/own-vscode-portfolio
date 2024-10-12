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

          // Fallback after 300ms to ensure redirection happens
          setTimeout(() => {
            window.location.href = `https://${url}`;
          }, 300);
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
          // iOS: Use x-web-search:// to attempt opening the external browser
          window.location.href = `x-web-search://${url}`;

          // Fallback to ensure the correct URL is loaded
          setTimeout(() => {
            window.location.href = `https://${url}`;
          }, 300); // Small delay to force redirection
        }
      } else {
        // Non-Instagram users: Open the landing page directly
        window.location.href = `https://${url}`;
      }
    }
  }, [url]);

  return (
    <div>
      <p>Redirecting...</p>

      {/* Meta Refresh fallback in case JavaScript fails */}
      <meta http-equiv="refresh" content="0;url=https://yourlandingpage.com" />
    </div>
  );
};

export default RedirectPage;
