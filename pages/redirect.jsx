import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Redirect() {
  useEffect(() => {
    // URL de l'API Next.js qui télécharge le fichier
    const targetUrl = '/api/download';
    window.location.href = targetUrl;
  }, []);

  return (
    <div>
      <h1>Redirecting...</h1>
      <p>If you are not redirected automatically, please check your connection and try again.</p>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
