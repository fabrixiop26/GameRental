import {createProxyMiddleware } from "http-proxy-middleware";

// find the right url to target for the proxy (this will be used when fetching data to redirect to backend)
// ASPNETCORE_URLS is found in launchSettings applicationUrl or else use the iisExpress.applicationUrl
const target = process.env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}` :
    process.env.ASPNETCORE_URLS ? process.env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:4836';

// routes to redirect with the proxy
const context = ["/weatherforecast"];

export default function(app: any) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false,
        headers: {
            Connection: 'Keep-Alive'
        }
    });
    app.use(appProxy);
}