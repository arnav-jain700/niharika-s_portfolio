import { defineConfig } from 'vite';

function codingStatsPlugin() {
  return {
    name: 'coding-stats-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlPath = req.url ? req.url.split('?')[0] : '';
        if (urlPath === '/api/coding-stats' || urlPath === '/api/coding-stats.js') {
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
  };
}

export default defineConfig({
  plugins: [codingStatsPlugin()]
});
