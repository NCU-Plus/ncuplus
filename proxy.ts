import { createServer } from "http";
import { createProxyServer } from "http-proxy";

const proxy = createProxyServer();
proxy.on("error", (err) => console.warn(err));

const server = createServer((req, res) => {
  const frontendPort = process.env.FRONTEND_PORT ?? 3001;
  const backendPort = process.env.BACKEND_PORT ?? 3000;
  req.url = req.url ?? "/";
  if (
    doesProxyContextMatchUrl(process.env.PROXY_PREFIX ?? "/open-api", req.url)
  ) {
    req.url = req.url.replace(
      RegExp(process.env.PROXY_PREFIX ?? "^/open-api"),
      ""
    );
    proxy.web(req, res, {
      target: `http://localhost:${backendPort}`,
      changeOrigin: true,
    });
    return;
  }
  proxy.web(req, res, { target: `http://localhost:${frontendPort}` });
});

server.on("error", (err) => console.warn(err));

console.log(
  `Proxy start listening on port ${process.env.PROXY_LISTEN_PORT ?? 4000}`
);
server.listen(parseInt(process.env.PROXY_LISTEN_PORT ?? "4000"));

function doesProxyContextMatchUrl(context: string, url: string): boolean {
  return (
    (context.startsWith("^") && new RegExp(context).test(url)) ||
    url.startsWith(context)
  );
}
