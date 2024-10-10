// pages/api/redirect/[shortCode].js
export default async function handler(req, res) {
    const { shortCode } = req.query;
  
    // Function to get the actual URL from your database
    const getActualUrl = async (code) => {
      // In a real implementation, fetch the actual URL from your database
      return `https://your-actual-destination.com/${code}`;
    };
  
    try {
      const actualUrl = await getActualUrl(shortCode);
  
      // Set headers to prevent caching
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      res.setHeader('Pragma', 'no-cache');
  
      // Attempt to break out of the in-app browser
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="refresh" content="0;url=${actualUrl}">
            <script>
              window.onload = function() {
                window.location.replace("${actualUrl}");
              }
            </script>
          </head>
          <body>
            <h1>Redirecting...</h1>
            <p>If you are not redirected, <a href="${actualUrl}" target="_blank" rel="noopener noreferrer">click here</a>.</p>
          </body>
        </html>
      `);
    } catch (error) {
      res.status(500).json({ error: 'Failed to redirect' });
    }
  }
  