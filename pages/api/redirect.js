  // Fonction helper (à implémenter selon votre logique de stockage)
  async function getOriginalUrl(shortCode) {
    // Logique pour récupérer l'URL originale à partir du shortCode
    // Cela pourrait impliquer une requête à votre base de données
    return 'https://example.com/your-long-url';
  }
  
// Pages API Next.js (pages/api/redirect/[shortCode].js)
export default function handler(req, res) {
    const { shortCode } = req.query;
    const originalUrl = getOriginalUrl(shortCode); // Implémentez cette fonction
    const userAgent = req.headers['user-agent'];
    const isInstagram = userAgent.includes('Instagram');
  
    if (isInstagram) {
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script>
              (function() {
                function attemptBypass() {
                  // Tentative 1: Forcer l'ouverture d'une nouvelle fenêtre
                  var newWindow = window.open('${originalUrl}', '_system');
                  if (newWindow) {
                    window.close();
                    return;
                  }
  
                  // Tentative 2: Utiliser la navigation programmatique
                  try {
                    window.location.replace('${originalUrl}');
                  } catch (e) {
                    console.error('Erreur lors de la redirection:', e);
                  }
  
                  // Tentative 3: Manipulation du DOM
                  document.body.innerHTML = '<iframe src="${originalUrl}" style="position:fixed;top:0;left:0;width:100%;height:100%;border:none;"></iframe>';
                }
  
                // Exécuter immédiatement et répéter plusieurs fois
                attemptBypass();
                for (var i = 0; i < 5; i++) {
                  setTimeout(attemptBypass, i * 500);
                }
              })();
            </script>
          </head>
          <body>
            <p>Redirection en cours...</p>
          </body>
        </html>
      `);
    } else {
      res.redirect(301, originalUrl);
    }
  }