const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); 
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(bodyParser.json());
app.use(cors()); 

app.post('/api/setTargetUrl', (req, res) => {
  const { url } = req.body;
  console.log('Received targetUrl:', url);

  const proxyMiddleware = createProxyMiddleware({
    target: url,
    changeOrigin: true,
    ws: true,
  });

  app.use('/', proxyMiddleware);

  res.json({ message: 'Received targetUrl successfully!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
