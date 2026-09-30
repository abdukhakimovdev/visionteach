import React from 'react';
import { Trash2, RefreshCw, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';
import { LoadingScanner } from './LoadingScanner';

interface ImagePreviewProps {
  language: Language;
  imageSrc: string;
  fileInfo: {
    name: string;
    size: number;
    mimeType: string;
  };
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onRemove: () => void;
  onReplace: () => void;
}

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  language,
  imageSrc,
  fileInfo,
  isAnalyzing,
  onAnalyze,
  onRemove,
  onReplace,
}) => {
  const t = getTranslation(language);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-xl backdrop-blur-xl transition-all dark:border-slate-800 dark:bg-slate-900/80">
      {/* Top Bar with file name and quick actions */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
              {fileInfo.name}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>{formatBytes(fileInfo.size)}</span>
              <span>·</span>
              <span className="uppercase">{fileInfo.mimeType.replace('image/', '')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Replace & Remove */}
        {!isAnalyzing && (
          <div className="flex items-center gap-2">
            <button
              onClick={onReplace}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>{t.btnReplace}</span>
            </button>
            <button
              onClick={onRemove}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200/60 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>{t.btnRemove}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center border border-slate-200 dark:border-slate-800">
        <img
          src={imageSrc}
          alt={fileInfo.name}
          className={`h-full w-full object-contain transition-all duration-500 ${
            isAnalyzing ? 'scale-105 brightness-90 filter' : ''
          }`}
        />

        {/* Laser Scanning Bar Overlay during analysis */}
        {isAnalyzing && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-cyan-950/20 backdrop-blur-[1px]" />
            <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-scanner-bar" />
            
            {/* Viewfinder corners */}
            <div className="pointer-events-none absolute inset-6 border border-cyan-400/30 rounded-lg">
              <div className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-cyan-400" />
            </div>
          </>
        )}
      </div>

      {/* Bottom Section: CTA or Loading Scanner Status */}
      <div className="mt-5">
        {isAnalyzing ? (
          <LoadingScanner language={language} />
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>{t.readyToAnalyze}</span>
            </div>

            <button
              onClick={onAnalyze}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4" />
              <span>{t.btnAnalyze}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
