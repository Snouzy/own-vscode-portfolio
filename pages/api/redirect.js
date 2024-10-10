  // Fonction helper (à implémenter selon votre logique de stockage)
  async function getOriginalUrl(shortCode) {
    // Logique pour récupérer l'URL originale à partir du shortCode
    // Cela pourrait impliquer une requête à votre base de données
    return 'https://example.com/your-long-url';
  }
  
// Server-side (Next.js API route)
// pages/api/redirect/[shortCode].js
export default async function handler(req, res) {
    const { shortCode } = req.query;
    
    // 1. Récupérer l'URL originale à partir du shortCode
    const originalUrl = await getOriginalUrl(shortCode);
    
    // 2. Détecter le user agent
    const userAgent = req.headers['user-agent'];
    const isInstagram = userAgent.includes('Instagram');
    
    if (isInstagram) {
      // 3. Si c'est Instagram, servir une page HTML avec un script de redirection
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script>
              window.onload = function() {
                window.location.href = "${originalUrl}";
              }
            </script>
          </head>
          <body>
            <p>Redirection en cours...</p>
          </body>
        </html>
      `);
    } else {
      // 4. Sinon, effectuer une redirection directe
      res.redirect(301, originalUrl);
    }
  }
  

  
