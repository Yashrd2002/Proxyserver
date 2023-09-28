const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(bodyParser.json());

const proxyOptions = {
  target: 'http://proxy-server-iz3a.onrender.com',
  changeOrigin: true,
  pathRewrite: {
    '^/vr-streaming': '/vr-streaming',
  },
};

app.use('/vr-streaming', createProxyMiddleware(proxyOptions));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
