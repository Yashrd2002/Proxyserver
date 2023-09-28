var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
const PORT = 3000
http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://localhost:5173' });
}).listen(PORT);