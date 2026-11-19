import { ImageSlot } from '../types/ethnic';
import { getCachedImage, setCachedImage } from './imageCacheService';

export interface GenerateImageResult {
  imageUrl: string;
  cached: boolean;
  source: 'local-cache' | 'server-cache' | 'ai-generated';
}

export class ImageGenerationError extends Error {
  code: string;

  constructor(message: string, code = 'GENERATION_FAILED') {
    super(message);
    this.name = 'ImageGenerationError';
    this.code = code;
  }
}

export async function lookupExistingImage(
  ethnicId: string,
  slot: ImageSlot,
  staticUrl?: string
): Promise<string | null> {
  if (staticUrl) {
    return staticUrl;
  }

  const localCached = await getCachedImage(ethnicId, slot);
  if (localCached) {
    return localCached;
  }

  try {
    const res = await fetch(
      `/api/cached-image/${encodeURIComponent(ethnicId)}/${encodeURIComponent(slot)}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.imageUrl) {
        await setCachedImage(ethnicId, slot, data.imageUrl);
        return data.imageUrl;
      }
    }
  } catch {
    // Ignore lookup failure; user can still generate on-demand
  }

  return null;
}

export async function generateEthnicImage(params: {
  ethnicId: string;
  slot: ImageSlot;
  prompt: string;
  aspectRatio?: '1:1' | '3:4' | '4:3' | '16:9';
  forceRegenerate?: boolean;
}): Promise<GenerateImageResult> {
  const { ethnicId, slot, prompt, aspectRatio = '3:4', forceRegenerate = false } = params;

  if (!forceRegenerate) {
    const localCached = await getCachedImage(ethnicId, slot);
    if (localCached) {
      return { imageUrl: localCached, cached: true, source: 'local-cache' };
    }
  }

  const response = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ethnicId,
      slot,
      prompt,
      aspectRatio,
      forceRegenerate,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload?.imageUrl) {
    throw new ImageGenerationError(
      payload?.error || 'Unable to generate AI image right now. Please try again.',
      payload?.code || 'GENERATION_FAILED'
    );
  }

  await setCachedImage(ethnicId, slot, payload.imageUrl);

  return {
    imageUrl: payload.imageUrl,
    cached: Boolean(payload.cached),
    source: payload.cached ? 'server-cache' : 'ai-generated',
  };
}
