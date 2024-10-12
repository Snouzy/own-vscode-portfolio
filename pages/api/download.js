import { Client } from 'ftp';

export default function handler(req, res) {
  const ftpClient = new Client();

  ftpClient.on('ready', function() {
    ftpClient.get('/bridge.html', function(err, stream) {
      if (err) {
        res.status(500).json({ error: 'Failed to retrieve file from FTP' });
        return;
      }
      
      stream.once('close', function() { ftpClient.end(); });
      stream.pipe(res); // Stream the file to the response
    });
  });

  ftpClient.connect({
    host: '109.234.165.226',
    user: 'brma8895',
    password: 'acWD-tFsP-yzn$'
  });
}
