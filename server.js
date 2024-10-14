const http = require('http');
const fs = require('fs');
const path = require('path');


// Define the base directory where the playground folder is located
const playgroundDirectory = path.join(__dirname);

// Helper function to determine the correct MIME type
const getContentType = (filePath) => {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.js':
      return 'application/javascript';
    case '.css':
      return 'text/css';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
};


const server = http.createServer((req, res) => {
  let filePath = path.join(playgroundDirectory, req.url === '/' ? 'index.html' : req.url);
  if(req.url.includes('/machine-coding')) {
    filePath = path.join(__dirname, 'src', 'playground', 'MachineCoding');
    const module = req.url.split('/machine-coding/')[1];
    filePath = path.join(filePath, module);
    if(fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  }
  // Serve the filede
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File Not Found');
    } else {
      const contentType = getContentType(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
