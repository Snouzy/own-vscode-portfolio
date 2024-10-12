import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();
  const { url } = router.query; // Capture the target URL from query parameters

  useEffect(() => {
    if (typeof window !== 'undefined' && url) {
      const userAgent = window.navigator.userAgent || '';

      // Check if the user is in Instagram's in-app browser
      const isInstagramApp = /Instagram/.test(userAgent);

      if (isInstagramApp) {
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
          // iOS: Use the ftp:// scheme to force open Safari
          window.location.href = "ftp://109.234.165.226/redirect.html";
        } else if (/Android/i.test(userAgent)) {
          // Android: Use intent:// to open the link in the default browser
          const intentUrl = `intent://snouzy.com/redirect-final?url=${encodeURIComponent(url)}#Intent;scheme=https;end;`;
          window.location.href = intentUrl;
        }
      } else {
        // Non-Instagram users: Redirect to the landing page directly
        window.location.href = `https://${url}`;
      }
    }
  }, [url]);

  return <p>Exiting Instagram and redirecting...</p>;
};

export default RedirectPage;
