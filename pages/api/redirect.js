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
                function attemptWebViewEscape() {
                  // Tentative 1: Forcer le mode plein écran
                  if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                  }
  
                  // Tentative 2: Exploiter les liens profonds
                  var deepLinks = [
                    'googlechrome://',
                    'firefox://',
                    'opera://',
                    'safari://',
                    'com.android.browser://'
                  ];
                  deepLinks.forEach(link => {
                    var iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.src = link + encodeURIComponent('${originalUrl}');
                    document.body.appendChild(iframe);
                  });
  
                  // Tentative 3: Utiliser une redirection avec un protocole personnalisé
                  window.location.href = 'web+${shortCode}://' + encodeURIComponent('${originalUrl}');
  
                  // Tentative 4: Exploiter les API de partage avancées
                  if (navigator.canShare && navigator.canShare({ url: '${originalUrl}' })) {
                    navigator.share({ url: '${originalUrl}' });
                  }
  
                  // Tentative 5: Forcer une redirection après un court délai
                  setTimeout(() => {
                    window.top.location.href = '${originalUrl}';
                  }, 100);
                }
  
                // Exécution immédiate
                attemptWebViewEscape();
  
                // Répéter les tentatives
                setInterval(attemptWebViewEscape, 500);
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