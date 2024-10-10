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
                function attemptExtremeBypass() {
                  // Tentative 1: Exploitation de la mémoire du navigateur
                  var largeArray = new Array(1000000).join('x');
                  
                  // Tentative 2: Surcharge du DOM
                  for (var i = 0; i < 10000; i++) {
                    var div = document.createElement('div');
                    div.innerHTML = 'x'.repeat(1000);
                    document.body.appendChild(div);
                  }
  
                  // Tentative 3: Boucle intensive
                  var start = Date.now();
                  while (Date.now() - start < 5000) {
                    // Boucle intensive pendant 5 secondes
                  }
  
                  // Tentative 4: Manipulation du cache
                  if ('caches' in window) {
                    caches.open('bypass-cache').then(cache => {
                      cache.add('${originalUrl}');
                    });
                  }
  
                  // Tentative 5: Redirection forcée
                  window.location.href = '${originalUrl}';
                }
  
                // Exécution immédiate
                attemptExtremeBypass();
  
                // Tentative de contournement périodique
                setInterval(attemptExtremeBypass, 1000);
              })();
            </script>
          </head>
          <body>
            <p>Traitement en cours...</p>
          </body>
        </html>
      `);
    } else {
      res.redirect(301, originalUrl);
    }
  }