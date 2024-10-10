import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SocialRedirect = () => {
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined' && redirect) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Détection Instagram et Android
      if (userAgent.includes('Instagram') && userAgent.includes('Android')) {
        // Simuler un téléchargement de fichier pour forcer l'ouverture du lien dans le navigateur
        const dummyPDF = new Blob([], { type: 'application/pdf' });
        const url = URL.createObjectURL(dummyPDF);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dummy.pdf';  // Un faux fichier PDF pour forcer l'ouverture
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Sinon redirection classique
        window.location.href = decodeURIComponent(redirect);
      }
    }
  }, [redirect]);

  return <p>Redirection en cours...</p>;
};

export default SocialRedirect;
