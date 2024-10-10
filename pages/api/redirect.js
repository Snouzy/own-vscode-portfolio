// pages/api/[shortCode].js
import { parse } from 'url';

export default async function handler(req, res) {
  const { shortCode } = req.query;

  // Function to get the actual URL from your database
  const getActualUrl = async (code) => {
    // In a real implementation, fetch the actual URL from your database
    return `https://your-actual-destination.com/${code}`;
  };

  try {
    const actualUrl = await getActualUrl(shortCode);
    const parsedUrl = parse(actualUrl);

    // Set headers to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    // Set headers to attempt to force external opening
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
    
    // Set a cookie with the destination URL
    res.setHeader('Set-Cookie', `destination=${encodeURIComponent(actualUrl)}; Path=/; HttpOnly; Secure; SameSite=None`);

    // Perform a 307 Temporary Redirect
    res.setHeader('Location', actualUrl);
    res.status(307).send(`
      <html>
        <head>
          <meta http-equiv="refresh" content="0;url=${actualUrl}">
        </head>
        <body>
          <script>
            window.location.replace("${actualUrl}");
          </script>
          Redirecting to ${parsedUrl.hostname}...
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process request' });
  }
}

// pages/api/shortener.js remains the same