// pages/api/bridge.js
import FTP from 'ftp';

export default function handler(req, res) {
  const client = new FTP();

  client.on('ready', () => {
    client.get('/bridge.html', (err, stream) => {
      if (err) {
        console.error('FTP get error:', err);
        res.status(500).json({ error: 'Failed to retrieve file from FTP' });
        client.end();
        return;
      }

      let htmlData = '';
      stream.on('data', (chunk) => {
        htmlData += chunk.toString();
      });

      stream.on('end', () => {
        client.end();

        // Get the target URL from the query parameter
        const targetUrl = req.query.url || 'https://snouzy.com';

        // Replace a placeholder in the HTML with the actual target URL
        htmlData = htmlData.replace('{{TARGET_URL}}', targetUrl);

        // Set the content type and send the response
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlData);
      });
    });
  });

  client.on('error', (err) => {
    console.error('FTP connection error:', err);
    res.status(500).json({ error: 'Failed to connect to FTP server' });
  });

  client.connect({
    host: '109.234.165.226',
    user: 'brma8895',
    password: 'acWD-tFsP-yzn$'
  });
}