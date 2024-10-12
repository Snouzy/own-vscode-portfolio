import { useEffect } from 'react';

const FinalRedirect = () => {
  useEffect(() => {
    // Automatically redirect to the final URL
    window.location.href = 'https://yourlandingpage.com';
  }, []);

  return <p>Redirecting to your destination...</p>;
};

export default FinalRedirect;
