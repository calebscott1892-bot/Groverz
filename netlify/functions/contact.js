import { handleContactRequest } from '../../server/contact/contact-service.js';

export async function handler(event) {
  const result = await handleContactRequest({
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
  });

  return {
    statusCode: result.status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8',
      ...result.headers,
    },
    body: JSON.stringify(result.body),
  };
}
