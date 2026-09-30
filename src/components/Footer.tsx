import React from 'react';
import { Eye, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface FooterProps {
  language: Language;
  onNavigate: (section: 'hero' | 'analyzer' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = getTranslation(language);

  return (
    <footer className="border-t border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div
              onClick={() => onNavigate('hero')}
              className="flex cursor-pointer items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs">
                <Eye className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Vision<span className="text-cyan-500">AI</span>
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {t.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button
              onClick={() => onNavigate('hero')}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {t.navHome}
            </button>
            <button
              onClick={() => onNavigate('analyzer')}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {t.navAnalyze}
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {t.navAbout}
            </button>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <span>© {new Date().getFullYear()} VisionAI</span>
              <span>·</span>
              <span>Multimodal Vision</span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-400/80">
              Powered by Google Gemini 3.8 Flash
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
