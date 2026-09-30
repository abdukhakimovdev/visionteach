import React, { useState } from 'react';
import { History, X, Trash2, Calendar, Eye, AlertTriangle } from 'lucide-react';
import { HistoryItem, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  language,
  history,
  onSelectHistoryItem,
  onDeleteItem,
  onClearAll,
}) => {
  const t = getTranslation(language);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-cyan-500" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              {t.historyTitle}
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {history.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Clear All Confirmation Dialog */}
        {showClearConfirm && (
          <div className="border-b border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/50">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h5 className="text-xs font-bold text-red-900 dark:text-red-200">
                  {t.confirmClearTitle}
                </h5>
                <p className="mt-0.5 text-[11px] text-red-700 dark:text-red-300">
                  {t.confirmClearDesc}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClearAll();
                      setShowClearConfirm(false);
                    }}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-500 transition-colors"
                  >
                    {t.confirmYes}
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
                  >
                    {t.confirmCancel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-400">
              <History className="mb-3 h-12 w-12 text-slate-300 dark:text-slate-700" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {t.historyEmpty}
              </p>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                {t.historyEmptyDesc}
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectHistoryItem(item);
                  onClose();
                }}
                className="group relative flex cursor-pointer gap-3.5 rounded-xl border border-slate-200 bg-white p-3 shadow-xs hover:border-cyan-400/80 hover:shadow-md dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-cyan-500/50 transition-all duration-200"
              >
                {/* Thumbnail */}
                <div className="h-18 w-18 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <img
                    src={item.imageThumbnail}
                    alt={item.data.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between min-w-0 pr-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
                      <span className="truncate">{item.data.category}</span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="uppercase">{item.language}</span>
                    </div>

                    <h4 className="truncate text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.data.title}
                    </h4>

                    <p className="line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.data.shortSummary}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-2">
                    <Calendar className="h-3 w-3" />
                    <span>{item.dateStr}</span>
                  </div>
                </div>

                {/* Single Delete Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem(item.id);
                  }}
                  className="absolute top-2.5 right-2.5 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors"
                  title={t.btnDelete}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Clear All Button */}
        {history.length > 0 && (
          <div className="border-t border-slate-200 p-4 dark:border-slate-800">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/60 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/60 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>{t.btnClearAll}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
