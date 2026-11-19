import type { IncomingMessage, ServerResponse } from 'http';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const hasKey = Boolean(
    process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== 'MY_GEMINI_API_KEY'
  );
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify({ ok: true, aiConfigured: hasKey }));
}
