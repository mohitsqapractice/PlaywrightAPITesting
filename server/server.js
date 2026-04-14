const https = require('https');
const fs = require('fs');
const path = require('path');

const certDir = path.resolve(__dirname, '../certs');

const options = {
  key: fs.readFileSync(path.join(certDir, 'server.key')),
  cert: fs.readFileSync(path.join(certDir, 'server.crt')),
  ca: fs.readFileSync(path.join(certDir, 'ca.crt')),

  requestCert: true,
  rejectUnauthorized: true
};
console.log("CA exists:", fs.existsSync(path.join(certDir, 'ca.crt')));
console.log("Server key exists:", fs.existsSync(path.join(certDir, 'server.key')));
console.log("Server cert exists:", fs.existsSync(path.join(certDir, 'server.crt')));

https.createServer(options, (req, res) => {
  console.log('Client authorized:', req.client.authorized);

  if (req.client.authorized) {
    res.end('Authenticated via Certificate');
  } else {
    res.statusCode = 401;
    res.end('Unauthorized');
  }
}).listen(8443, () => {
  console.log('Server running on https://localhost:8443');
});