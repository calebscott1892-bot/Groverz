import { Resend } from 'resend';

const CONTACT_TO_EMAIL = 'ankit@groverztax.com.au';
const CONTACT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_RATE_LIMIT_MAX_REQUESTS = 5;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Keep the Resend onboarding sender until groverztax.com.au is verified in Resend and the DNS records are live.
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';

const rateLimitStore = globalThis.__groverzContactRateLimitStore ?? new Map();

if (!globalThis.__groverzContactRateLimitStore) {
  globalThis.__groverzContactRateLimitStore = rateLimitStore;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeSingleLine(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .normalize('NFKC')
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function sanitizeMultiline(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .normalize('NFKC')
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength);
}

function toHeaderMap(headers = {}) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key.toLowerCase(),
      Array.isArray(value) ? value.join(',') : String(value ?? ''),
    ])
  );
}

function getClientIp(headers) {
  const forwardedFor =
    headers['x-forwarded-for'] ?? headers['client-ip'] ?? headers['x-real-ip'] ?? '';

  return forwardedFor.split(',')[0].trim() || 'unknown';
}

function pruneRateLimitStore(now) {
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function checkRateLimit(clientIp) {
  const now = Date.now();
  pruneRateLimitStore(now);

  const existingEntry = rateLimitStore.get(clientIp);

  if (!existingEntry) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetAt: now + CONTACT_RATE_LIMIT_WINDOW_MS,
    });

    return { allowed: true, retryAfter: 0 };
  }

  if (existingEntry.count >= CONTACT_RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((existingEntry.resetAt - now) / 1000)),
    };
  }

  existingEntry.count += 1;

  return { allowed: true, retryAfter: 0 };
}

function formatTimestamp(date) {
  try {
    return new Intl.DateTimeFormat('en-AU', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Australia/Perth',
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

function validatePayload(payload) {
  const name = sanitizeSingleLine(payload.name, 120);
  const email = sanitizeSingleLine(payload.email, 320).toLowerCase();
  const phone = sanitizeSingleLine(payload.phone ?? '', 40);
  const service = sanitizeSingleLine(payload.service ?? '', 100);
  const message = sanitizeMultiline(payload.message, 4000);
  const fieldErrors = {};

  if (!name) {
    fieldErrors.name = 'Please enter your name.';
  }

  if (!email) {
    fieldErrors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    fieldErrors.message = 'Please enter a short message.';
  }

  if (phone && !/^[\d\s+\-()]{6,20}$/.test(phone)) {
    fieldErrors.phone = 'Please enter a valid phone number.';
  }

  return {
    values: {
      name,
      email,
      phone,
      service: service || 'General Enquiry',
      message,
    },
    fieldErrors,
  };
}

function renderEmailHtml({ name, email, phone, service, message, submittedAt }) {
  const escapedMessage = escapeHtml(message).replace(/\n/g, '<br />');

  return `
    <div style="background:#f5f5f5;padding:32px 16px;font-family:Arial,sans-serif;color:#1f2937;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
        <div style="background:#1e1b4b;padding:24px 28px;color:#ffffff;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.78;">Groverz Tax &amp; Accounting</p>
          <h1 style="margin:0;font-size:24px;line-height:1.3;">New Contact Form Submission</h1>
        </div>
        <div style="padding:28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:0 0 14px;width:160px;font-size:13px;font-weight:700;color:#6b7280;vertical-align:top;">Name</td>
              <td style="padding:0 0 14px;font-size:15px;color:#111827;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:0 0 14px;width:160px;font-size:13px;font-weight:700;color:#6b7280;vertical-align:top;">Email</td>
              <td style="padding:0 0 14px;font-size:15px;color:#111827;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding:0 0 14px;width:160px;font-size:13px;font-weight:700;color:#6b7280;vertical-align:top;">Phone</td>
              <td style="padding:0 0 14px;font-size:15px;color:#111827;">${escapeHtml(phone || 'Not provided')}</td>
            </tr>
            <tr>
              <td style="padding:0 0 14px;width:160px;font-size:13px;font-weight:700;color:#6b7280;vertical-align:top;">Service</td>
              <td style="padding:0 0 14px;font-size:15px;color:#111827;">${escapeHtml(service)}</td>
            </tr>
            <tr>
              <td style="padding:0;width:160px;font-size:13px;font-weight:700;color:#6b7280;vertical-align:top;">Submitted</td>
              <td style="padding:0;font-size:15px;color:#111827;">${escapeHtml(submittedAt)}</td>
            </tr>
          </table>
          <div style="margin-top:28px;border-top:1px solid #e5e7eb;padding-top:24px;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
            <div style="font-size:15px;line-height:1.7;color:#111827;white-space:normal;">${escapedMessage}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderEmailText({ name, email, phone, service, message, submittedAt }) {
  return [
    'New Contact Form Submission',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Service: ${service}`,
    `Submitted: ${submittedAt}`,
    '',
    'Message:',
    message,
  ].join('\n');
}

function makeResponse(status, body, headers = {}) {
  return {
    status,
    headers,
    body,
  };
}

export async function handleContactRequest({ method = 'POST', headers = {}, body }) {
  if (method !== 'POST') {
    return makeResponse(405, { error: 'Method not allowed.' }, { Allow: 'POST' });
  }

  let payload;

  try {
    payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
  } catch {
    return makeResponse(400, { error: 'Invalid request body.' });
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return makeResponse(400, { error: 'Invalid request body.' });
  }

  if (payload.botField || payload['bot-field']) {
    return makeResponse(200, { message: 'Enquiry sent successfully.' });
  }

  const normalizedHeaders = toHeaderMap(headers);
  const rateLimit = checkRateLimit(getClientIp(normalizedHeaders));

  if (!rateLimit.allowed) {
    return makeResponse(
      429,
      { error: 'Too many enquiries from this connection. Please try again in a few minutes.' },
      { 'Retry-After': String(rateLimit.retryAfter) }
    );
  }

  const { values, fieldErrors } = validatePayload(payload);

  if (Object.keys(fieldErrors).length > 0) {
    return makeResponse(400, {
      error: Object.values(fieldErrors)[0],
      fieldErrors,
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return makeResponse(500, {
      error:
        'Email service is not configured on the server. Add RESEND_API_KEY before using the contact form.',
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddress =
    sanitizeSingleLine(process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL, 320) ||
    DEFAULT_FROM_EMAIL;
  const submittedAt = formatTimestamp(new Date());

  try {
    const { data, error } = await resend.emails.send({
      from: `Groverz Tax & Accounting <${fromAddress}>`,
      to: [CONTACT_TO_EMAIL],
      subject: `New Contact Form Submission - ${values.name}`,
      replyTo: values.email,
      html: renderEmailHtml({
        ...values,
        submittedAt,
      }),
      text: renderEmailText({
        ...values,
        submittedAt,
      }),
    });

    if (error) {
      console.error('Resend returned an error for contact submission.', error);
      return makeResponse(502, {
        error: 'We could not send your enquiry right now. Please try again shortly.',
      });
    }

    return makeResponse(200, {
      message: 'Enquiry sent successfully.',
      id: data?.id ?? null,
    });
  } catch (error) {
    console.error('Unexpected contact submission failure.', error);
    return makeResponse(500, {
      error: 'We could not send your enquiry right now. Please try again shortly.',
    });
  }
}
