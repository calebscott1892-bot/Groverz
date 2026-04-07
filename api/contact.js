import { handleContactRequest } from '../server/contact/contact-service.js';

export default async function handler(request, response) {
  const result = await handleContactRequest({
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  response.status(result.status);
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  for (const [header, value] of Object.entries(result.headers)) {
    response.setHeader(header, value);
  }

  response.send(JSON.stringify(result.body));
}
