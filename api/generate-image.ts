import { GoogleGenAI } from '@google/genai';

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { ethnicId, slot, prompt, aspectRatio = '3:4' } = body ?? {};

  if (!ethnicId || !slot || !prompt || typeof prompt !== 'string') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        error: 'Missing required parameters for image generation.',
        code: 'INVALID_REQUEST',
      })
    );
  }

  const ai = getGeminiClient();
  if (!ai) {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        error:
          'A paid Gemini API key is required to generate real-time 3D images. Cultural exhibitions remain fully accessible.',
        code: 'API_KEY_NOT_CONFIGURED',
      })
    );
  }

  const allowedRatios = new Set(['1:1', '3:4', '4:3', '9:16', '16:9']);
  const safeRatio = allowedRatios.has(aspectRatio) ? aspectRatio : '3:4';
  const modelName = 'gemini-3.1-flash-lite-image';

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: safeRatio,
        },
      },
    });

    let imageUrl = '';
    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType ?? 'image/png';
        imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      return res.end(
        JSON.stringify({
          error: 'AI model did not return image data. Please try again.',
          code: 'EMPTY_IMAGE_RESPONSE',
        })
      );
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        imageUrl,
        cached: false,
        model: modelName,
      })
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const isQuotaOrBilling =
      message.includes('429') ||
      message.includes('RESOURCE_EXHAUSTED') ||
      message.includes('403') ||
      message.includes('PERMISSION_DENIED') ||
      message.includes('API_KEY_INVALID') ||
      message.includes('billing');

    res.writeHead(isQuotaOrBilling ? 403 : 500, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        error: isQuotaOrBilling
          ? 'AI 3D image generation requires a Gemini API key with billing enabled. Cultural exhibits remain fully available.'
          : 'Unable to generate AI image right now. Please try again later.',
        code: isQuotaOrBilling ? 'PAID_KEY_REQUIRED' : 'GENERATION_FAILED',
        details: message.slice(0, 220),
      })
    );
  }
}
