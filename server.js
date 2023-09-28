const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.get('/', (req, res) => {
  const targetUrl = req.query.targetUrl;
  if (!targetUrl) {
    return res.status(400).send('Target URL is missing.');
  }

  const apiProxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
  });

  // Use the proxy middleware for all paths
  app.use('/', apiProxy);

  // Respond with the target URL
  res.send(`Proxying requests to: ${targetUrl}`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
