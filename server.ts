import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const CACHE_DIR = path.resolve(__dirname, '.cache', 'generated-images');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function sanitizeKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80);
}

function getCacheFilePath(ethnicId: string, slot: string): string {
  return path.join(CACHE_DIR, `${sanitizeKey(ethnicId)}__${sanitizeKey(slot)}.json`);
}

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

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '4mb' }));

  app.get('/api/health', (_req, res) => {
    const hasKey = Boolean(
      process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== 'MY_GEMINI_API_KEY'
    );
    res.json({ ok: true, aiConfigured: hasKey });
  });

  app.get('/api/cached-image/:ethnicId/:slot', (req, res) => {
    const { ethnicId, slot } = req.params;
    const cachePath = getCacheFilePath(ethnicId, slot);
    if (fs.existsSync(cachePath)) {
      try {
        const payload = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
        return res.json({ cached: true, imageUrl: payload.imageUrl, model: payload.model });
      } catch {
        return res.status(404).json({ cached: false });
      }
    }
    return res.status(404).json({ cached: false });
  });

  app.post('/api/generate-image', async (req, res) => {
    try {
      const {
        ethnicId,
        slot,
        prompt,
        aspectRatio = '3:4',
        forceRegenerate = false,
      } = req.body ?? {};

      if (!ethnicId || !slot || !prompt || typeof prompt !== 'string') {
        return res.status(400).json({
          error: 'Thiếu thông tin yêu cầu tạo hình ảnh minh họa.',
          code: 'INVALID_REQUEST',
        });
      }

      const cachePath = getCacheFilePath(ethnicId, slot);
      if (!forceRegenerate && fs.existsSync(cachePath)) {
        try {
          const cached = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
          if (cached?.imageUrl) {
            return res.json({
              imageUrl: cached.imageUrl,
              cached: true,
              model: cached.model ?? 'gemini-3.1-flash-lite-image',
            });
          }
        } catch {
          // Ignore corrupted cache file and regenerate
        }
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error:
            'Chưa có khóa Gemini API trả phí được cấu hình cho dịch vụ tạo ảnh AI. Bạn vẫn có thể khám phá đầy đủ hồ sơ văn hóa và bật khóa API trong mục Settings > Secrets khi cần tạo ảnh 3D trực tiếp.',
          code: 'API_KEY_NOT_CONFIGURED',
        });
      }

      const allowedRatios = new Set(['1:1', '3:4', '4:3', '9:16', '16:9']);
      const safeRatio = allowedRatios.has(aspectRatio) ? aspectRatio : '3:4';
      const modelName = 'gemini-3.1-flash-lite-image';

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
        return res.status(502).json({
          error: 'Mô hình AI không trả về dữ liệu hình ảnh. Vui lòng thử lại.',
          code: 'EMPTY_IMAGE_RESPONSE',
        });
      }

      try {
        fs.writeFileSync(
          cachePath,
          JSON.stringify({
            ethnicId,
            slot,
            model: modelName,
            createdAt: new Date().toISOString(),
            imageUrl,
          })
        );
      } catch {
        // Non-fatal if disk cache write fails
      }

      return res.json({
        imageUrl,
        cached: false,
        model: modelName,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      const isQuotaOrBilling =
        message.includes('429') ||
        message.includes('RESOURCE_EXHAUSTED') ||
        message.includes('403') ||
        message.includes('PERMISSION_DENIED') ||
        message.includes('API_KEY_INVALID') ||
        message.includes('billing');

      return res.status(isQuotaOrBilling ? 403 : 500).json({
        error: isQuotaOrBilling
          ? 'Mô hình tạo ảnh 3D AI yêu cầu khóa Gemini API có bật thanh toán (Settings > Secrets). Hệ thống vẫn hiển thị đầy đủ bản trưng bày văn hóa chuẩn.'
          : 'Không thể tạo hình ảnh AI vào lúc này. Vui lòng thử lại sau ít phút.',
        code: isQuotaOrBilling ? 'PAID_KEY_REQUIRED' : 'GENERATION_FAILED',
        details: message.slice(0, 220),
      });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Việt Nam 54 Sắc Màu server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
