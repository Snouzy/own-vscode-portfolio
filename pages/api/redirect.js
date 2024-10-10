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
                  // Tentative 1: Exploiter les API de partage
                  if (navigator.share) {
                    navigator.share({url: '${originalUrl}'}).catch(() => {});
                  }
  
                  // Tentative 2: Utiliser une iframe cachée
                  var iframe = document.createElement('iframe');
                  iframe.style.display = 'none';
                  iframe.src = '${originalUrl}';
                  document.body.appendChild(iframe);
  
                  // Tentative 3: Manipulation de l'historique
                  history.pushState(null, '', '${originalUrl}');
                  history.go(0);
  
                  // Tentative 4: Redirection après un court délai
                  setTimeout(() => {
                    window.location.href = '${originalUrl}';
                  }, 100);
                }
  
                // Exécuter les tentatives
                attemptBypass();
  
                // Surveiller les changements de visibilité de la page
                document.addEventListener('visibilitychange', function() {
                  if (!document.hidden) {
                    attemptBypass();
                  }
                });
              })();
            </script>
          </head>
          <body>
            <p>Chargement en cours...</p>
          </body>
        </html>
      `);
    } else {
      res.redirect(301, originalUrl);
    }
  }