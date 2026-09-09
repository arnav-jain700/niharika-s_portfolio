import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/coding-stats')) {
          try {
            const parsedUrl = new URL(req.url, 'http://localhost:5173');
            const handlerModule = await server.ssrLoadModule('/api/coding-stats.js');
            const handler = handlerModule.default || handlerModule;

            const customReq = {
              method: req.method,
              query: Object.fromEntries(parsedUrl.searchParams.entries()),
              headers: req.headers
            };

            const customRes = {
              setHeader(key, val) {
                res.setHeader(key, val);
              },
              status(code) {
                res.statusCode = code;
                return this;
              },
              json(data) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
              end(data) {
                res.end(data);
              }
            };

            await handler(customReq, customRes);
            return;
          } catch (err) {
            console.error('Local dev /api/coding-stats proxy error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }
        next();
      });
    }
  }
});
