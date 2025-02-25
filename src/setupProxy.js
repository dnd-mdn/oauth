const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Bypass CORS in the dev environment
 */
module.exports = function(app) {
  app.use(
    "/proxy",
    createProxyMiddleware({
      target: process.env.REACT_APP_GITHUB_AUTH_API, 
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/proxy": "",
      }
    })
  );
};