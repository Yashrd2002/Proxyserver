const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const targetUrl = 'http://192.168.1.2:3442'; // Replace with your VR streaming server URL

const proxyMiddleware = createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
});

app.use('/vr-streaming', proxyMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
