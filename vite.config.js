import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { handleContactRequest } from './server/contact/contact-service.js';

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      resolve(body);
    });

    request.on('error', reject);
  });
}

function contactApiDevPlugin() {
  return {
    name: 'contact-api-dev-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (request, response, next) => {
        try {
          const body = await readRequestBody(request);
          const result = await handleContactRequest({
            method: request.method,
            headers: request.headers,
            body,
          });

          response.statusCode = result.status;
          response.setHeader('Cache-Control', 'no-store');
          response.setHeader('Content-Type', 'application/json; charset=utf-8');

          for (const [header, value] of Object.entries(result.headers)) {
            response.setHeader(header, value);
          }

          response.end(JSON.stringify(result.body));
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  for (const [key, value] of Object.entries(env)) {
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }

  return {
    logLevel: 'error',
    plugins: [react(), contactApiDevPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
