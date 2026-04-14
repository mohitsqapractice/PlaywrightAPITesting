const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('../certs/server.key'),
  cert: fs.readFileSync('../certs/server.crt'),
  ca: fs.readFileSync('../certs/ca.crt'),

  requestCert: true,
  rejectUnauthorized: true
};

https.createServer(options, (req, res) => {

  if (req.client.authorized) {
    res.writeHead(200);
    res.end('✅ Authenticated via Certificate');
  } else {
    res.writeHead(401);
    res.end('❌ Unauthorized - No valid certificate');
  }

}).listen(8443, () => {
  console.log('🚀 Server running at https://localhost:8443');
});