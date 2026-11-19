import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { LightboxImage } from '../types/ethnic';

interface ImageViewerProps {
  image: LightboxImage | null;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ image, onClose }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(1);
  }, [image]);

  useEffect(() => {
    if (!image) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setScale((s) => Math.min(2.5, Number((s + 0.25).toFixed(2))));
      if (e.key === '-') setScale((s) => Math.max(0.75, Number((s - 0.25).toFixed(2))));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md p-4 lg:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      {/* Top toolbar */}
      <div
        className="flex items-center justify-between gap-4 text-white pb-3 border-b border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <h3 className="font-display font-bold text-base lg:text-lg truncate">
            {image.title}
          </h3>
          {image.subtitle && (
            <p className="text-xs text-slate-300 truncate">{image.subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.75, Number((s - 0.25).toFixed(2))))}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold tabular-nums min-w-[3.2rem] text-center text-slate-200">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(2.5, Number((s + 0.25).toFixed(2))))}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setScale(1)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Reset zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 p-2 rounded-lg bg-[#FF8C42] hover:bg-[#ea7a31] text-white transition-colors"
            title="Close"
            aria-label="Close image viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image viewport */}
      <div
        className="flex-1 min-h-0 flex items-center justify-center overflow-auto py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.title}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-200"
          style={{ transform: `scale(${scale})` }}
        />
      </div>

      {image.isAiGenerated && (
        <div className="pt-2 text-center text-[11px] tracking-wider text-amber-200/90 font-medium">
          AI-GENERATED ILLUSTRATION — REFERENCE OF TRADITIONAL COSTUME FEATURES
        </div>
      )}
    </div>
  );
};
