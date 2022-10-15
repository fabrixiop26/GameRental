const {createProxyMiddleware } = require("http-proxy-middleware");
// NOTE: if using typescript keep the .js version of this file and added it to the exclude field in tsconfig
// find the right url to target for the proxy (this will be used when fetching data to redirect to backend)
// ASPNETCORE_URLS is found in launchSettings applicationUrl or else use the iisExpress.applicationUrl
const target = process.env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}` :
    process.env.ASPNETCORE_URLS ? process.env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:4836';

// routes to redirect with the proxy
const context = ["/api/**"];

module.exports = function(app) {
    const appProxy = createProxyMiddleware(context, {
        target,
        secure: false
    });
    app.use(appProxy);
}