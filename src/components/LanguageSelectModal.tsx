import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, Check } from 'lucide-react';
import { Language } from '../i18n/translations';

interface LanguageSelectModalProps {
  isOpen: boolean;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelectModal: React.FC<LanguageSelectModalProps> = ({
  isOpen,
  currentLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.45)] border border-amber-900/10 text-slate-900 overflow-hidden"
        >
          {/* Subtle Decorative Background Arcs */}
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-amber-400/10 pointer-events-none blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-teal-500/10 pointer-events-none blur-2xl" />

          {/* Header Icon */}
          <div className="flex items-center justify-center mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFC83D] to-[#FF8C42] text-slate-950 shadow-md mb-4">
            <Globe2 className="w-7 h-7" />
          </div>

          {/* Main Question */}
          <div className="text-center">
            <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-snug">
              Which language would you like to use in the app?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              Bạn muốn sử dụng ngôn ngữ nào trong ứng dụng?
            </p>
          </div>

          {/* Options: Vietnamese & English */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Vietnamese Option */}
            <button
              type="button"
              onClick={() => onSelectLanguage('vi')}
              className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                currentLanguage === 'vi'
                  ? 'border-[#0F766E] bg-teal-50/60 shadow-md ring-2 ring-[#0F766E]/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 shadow-xs'
              }`}
            >
              <span className="text-3xl sm:text-4xl select-none mb-2">🇻🇳</span>
              <span className="font-display font-black text-base sm:text-lg text-slate-900">
                Vietnamese
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">Tiếng Việt</span>

              {currentLanguage === 'vi' && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              )}
            </button>

            {/* English Option */}
            <button
              type="button"
              onClick={() => onSelectLanguage('en')}
              className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                currentLanguage === 'en'
                  ? 'border-[#0F766E] bg-teal-50/60 shadow-md ring-2 ring-[#0F766E]/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 shadow-xs'
              }`}
            >
              <span className="text-3xl sm:text-4xl select-none mb-2">🇬🇧</span>
              <span className="font-display font-black text-base sm:text-lg text-slate-900">
                English
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">Tiếng Anh (UK)</span>

              {currentLanguage === 'en' && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              )}
            </button>
          </div>

          {/* Footer note exactly as requested */}
          <div className="mt-6 pt-4 border-t border-slate-900/6 text-center">
            <p className="text-xs text-slate-500 font-medium">
              You can change the language in the user interface.
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Bạn có thể thay đổi ngôn ngữ trên thanh công cụ bất kỳ lúc nào.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
