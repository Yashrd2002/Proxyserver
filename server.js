const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Authorization');
  next();
});
app.post('/', (req, res) => {
  const {url} = req.body;
  if (!url) {
    return res.status(400).send('Target URL is missing.');
  }

  const apiProxy = createProxyMiddleware({
    target: url,
    changeOrigin: true,
  });

  // Use the proxy middleware for the '/api' path
  app.use(apiProxy)
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
