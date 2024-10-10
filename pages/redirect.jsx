  // Client-side (page de redirection)
  // pages/[shortCode].js
  import { useEffect } from 'react';
  import { useRouter } from 'next/router';

  export default function RedirectPage() {
    const router = useRouter();
    const { shortCode } = router.query;
  
    useEffect(() => {
      if (shortCode) {
        window.location.href = `/api/redirect`;
      }
    }, [shortCode]);
  
    return <p>Redirection en cours...</p>;
  }
  
