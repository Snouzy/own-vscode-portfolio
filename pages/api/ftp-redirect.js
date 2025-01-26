import ftp from 'basic-ftp';

export default async function handler(req, res) {
  const { url } = req.query;
  console.log('url:', url)

  if (!url) {
    return res.status(400).json({ error: "URL paramètre manquant" });
  }

  try {
    const client = new ftp.Client();
    await client.access({
      host: "127.0.0.1",
      port: 21,
      user: "anonymous",
      password: "@anonymous",
    });

    // Télécharger le fichier bridge.html via FTP
    let htmlContent = '';
    const stream = await client.downloadToStream('bridge.html?url=' + encodeURIComponent(url));
    stream.on('data', chunk => {
      htmlContent += chunk.toString();
    });

    stream.on('end', () => {
      const redirectUrl = /[\?&]url=([^&#]*)/.exec(htmlContent);
      if (redirectUrl) {
        // Renvoie l'URL extraite depuis bridge.html
        res.status(200).json({ redirectUrl: decodeURIComponent(redirectUrl[1].replace(/\+/g, ' ')) });
      } else {
        res.status(404).json({ error: "URL not found in bridge.html" });
      }
    });
  } catch (error) {
    console.error("Erreur FTP:", error);
    res.status(500).json({ error: "Erreur serveur FTP" });
  }
}
