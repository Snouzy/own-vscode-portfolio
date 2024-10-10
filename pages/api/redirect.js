// pages/[shortCode].js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Redirect() {
  const router = useRouter();
  const { shortCode } = router.query;

  useEffect(() => {
    if (!shortCode) return;

    const getActualUrl = async (code) => {
      // In a real implementation, fetch the actual URL from your database
      return `https://your-actual-destination.com/${code}`;
    };

    const bypass = async () => {
      const actualUrl = await getActualUrl(shortCode);
      
      // Try multiple methods to break out of the in-app browser
      const methods = [
        () => window.open(actualUrl, '_system'),
        () => window.open(actualUrl, '_blank'),
        () => window.location.href = actualUrl,
        () => window.location.replace(actualUrl),
        () => window.location.assign(actualUrl),
        () => document.location.href = actualUrl,
        () => {
          const a = document.createElement('a');
          a.href = actualUrl;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.click();
        },
        () => {
          const form = document.createElement('form');
          form.method = 'GET';
          form.action = actualUrl;
          form.target = '_blank';
          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
        }
      ];

      // Try each method with a slight delay
      for (let i = 0; i < methods.length; i++) {
        setTimeout(methods[i], i * 100);
      }
    };

    bypass();
  }, [shortCode]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', paddingTop: '50px' }}>
      <h1>Redirecting you to your destination...</h1>
      <p>If you are not redirected automatically, please try the following:</p>
      <ol style={{ listStyleType: 'none', padding: 0 }}>
        <li><a href="#" id="openInBrowser">1. Open in Browser</a></li>
        <li><a href="#" id="copyLink">2. Copy Link</a></li>
      </ol>
    </div>
  );
}

// pages/api/shortener.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;
    // Generate a short code and save it to your database
    const shortCode = generateShortCode();
    // Save the mapping of shortCode to url in your database
    
    res.status(200).json({ shortCode });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

function generateShortCode() {
  // Implement your short code generation logic here
  return 'abc123'; // This is just a placeholder
}