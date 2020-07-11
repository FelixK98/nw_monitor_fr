const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/events', '/sig', '/nodes', '/ip', '/auth', '/block'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
