import React, { useState } from 'react';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  Download,
  AlertTriangle,
  GraduationCap,
  Layers,
  Wrench,
  Info,
  ShieldAlert,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Compass,
} from 'lucide-react';
import { AnalysisData, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface AnalysisResultProps {
  data: AnalysisData;
  language: Language;
  imageSrc: string;
  onNewAnalysis: () => void;
  onPrintReport: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  data,
  language,
  imageSrc,
  onNewAnalysis,
  onPrintReport,
}) => {
  const t = getTranslation(language);
  const [copied, setCopied] = useState(false);
  const [showSimple, setShowSimple] = useState(false);

  // Copy structured summary to clipboard
  const handleCopy = async () => {
    const textToCopy = `━━━━━━━━━━━━━━━━━━━━━
🔍 ${t.badgeWhatIsThis}: ${data.title}
📂 ${t.badgeCategory}: ${data.category}
🎯 ${t.badgeConfidence}: ${data.confidence}

📝 ${t.labelDescription.toUpperCase()}:
${data.description}

✨ ${t.labelCharacteristics.toUpperCase()}:
${data.characteristics.map((c) => `• ${c}`).join('\n')}

⚙️ ${t.labelPurpose.toUpperCase()}:
${data.purpose}

📦 ${t.labelMaterials.toUpperCase()}:
${data.materials.map((m) => `• ${m}`).join('\n')}

💡 ${t.labelHowToUse.toUpperCase()}:
${data.howToUse.map((h) => `• ${h}`).join('\n')}

🌟 ${t.labelFacts.toUpperCase()}:
${data.facts.map((f) => `• ${f}`).join('\n')}
${
  data.warnings && data.warnings.length > 0
    ? `\n⚠️ ${t.labelWarnings.toUpperCase()}:\n${data.warnings.map((w) => `• ${w}`).join('\n')}`
    : ''
}
━━━━━━━━━━━━━━━━━━━━━
VisionAI · ${t.tagline}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  };

  // Share via Web Share API or fallback to clipboard
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `VisionAI: ${data.title}`,
          text: `${data.title} (${data.category}) - ${data.shortSummary}`,
          url: window.location.href,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Action Bar Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
              {t.resultTitle}
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Gemini Vision Multimodal Analysis
            </span>
          </div>
        </div>

        {/* Action Buttons: Explain Simply, Copy, Share, Print, New */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Explain Simply Toggle */}
          <button
            onClick={() => setShowSimple(!showSimple)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              showSimple
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                : 'border border-amber-300/80 bg-amber-50 text-amber-900 hover:bg-amber-100 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/50'
            }`}
            title={t.btnExplainSimply}
          >
            <GraduationCap className="h-4 w-4" />
            <span>{showSimple ? t.btnExplainDetailed : t.btnExplainSimply}</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? t.btnCopied : t.btnCopy}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Share2 className="h-4 w-4 text-cyan-500" />
            <span>{t.btnShare}</span>
          </button>

          {/* Download/Print Report Button */}
          <button
            onClick={onPrintReport}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
            title={t.btnDownload}
          >
            <Download className="h-4 w-4" />
            <span>{t.btnDownload}</span>
          </button>

          {/* New Analysis */}
          <button
            onClick={onNewAnalysis}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t.btnNewAnalysis}</span>
          </button>
        </div>
      </div>

      {/* Uncertainty Disclaimer Banner if AI is not 100% sure */}
      {(data.isUncertain || data.uncertaintyNote) && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50/90 p-4 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200 animate-in fade-in duration-300">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1 text-sm">
            <h5 className="font-semibold">
              {data.uncertaintyNote || "Men to‘liq amin emasman. Rasmda quyidagi obyekt bo‘lishi mumkin:"}
            </h5>
            {data.alternatives && data.alternatives.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="font-medium text-amber-800 dark:text-amber-300">
                  {t.labelAlternatives}:
                </span>
                {data.alternatives.map((alt, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-amber-200/60 px-2 py-0.5 font-medium text-amber-900 dark:bg-amber-900/60 dark:text-amber-200"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Primary Overview Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-2xl dark:border-slate-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
          {/* Detected Image Thumbnail in Result */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="aspect-4/3 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-md">
              <img
                src={imageSrc}
                alt={data.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-3 md:col-span-8 lg:col-span-9">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                {data.category}
              </span>
              <span className="text-slate-600">·</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                <Sparkles className="h-3 w-3" />
                {data.confidence}
              </span>
            </div>

            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {data.title}
            </h2>

            <p className="text-sm leading-relaxed text-slate-300 max-w-3xl">
              {data.shortSummary}
            </p>
          </div>
        </div>
      </div>

      {/* "Explain Simply" Child/Beginner Friendly Card (if toggled) */}
      {showSimple && (
        <div className="rounded-2xl border-2 border-amber-400/80 bg-gradient-to-br from-amber-50 via-amber-50 to-orange-50/50 p-6 shadow-xl dark:border-amber-500/40 dark:bg-gradient-to-br dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/20 animate-in fade-in duration-300">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-amber-900 dark:text-amber-200">
                {t.btnExplainSimply}
              </h4>
              <span className="text-xs text-amber-700/80 dark:text-amber-400">
                {t.simpleExplainBadge}
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-sans">
            {data.simplifiedExplanation}
          </p>
        </div>
      )}

      {/* Main Dashboard Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1: Detailed Description */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2.5 text-slate-900 dark:text-white">
            <BookOpen className="h-5 w-5 text-cyan-500" />
            <h4 className="font-display text-base font-bold">{t.labelDescription}</h4>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {data.description}
          </p>
        </div>

        {/* Card 2: Visible Characteristics */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2.5 text-slate-900 dark:text-white">
            <Layers className="h-5 w-5 text-blue-500" />
            <h4 className="font-display text-base font-bold">{t.labelCharacteristics}</h4>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
            {data.characteristics.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Purpose & Role */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2.5 text-slate-900 dark:text-white">
            <Compass className="h-5 w-5 text-indigo-500" />
            <h4 className="font-display text-base font-bold">{t.labelPurpose}</h4>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {data.purpose}
          </p>

          {data.materials && data.materials.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                {t.labelMaterials}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {data.materials.map((mat, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card 4: How It is Used */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2.5 text-slate-900 dark:text-white">
            <Wrench className="h-5 w-5 text-emerald-500" />
            <h4 className="font-display text-base font-bold">{t.labelHowToUse}</h4>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
            {data.howToUse.map((step, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-[11px] font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  {index + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 5: Fascinating Facts */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:col-span-2">
          <div className="mb-4 flex items-center gap-2.5 text-slate-900 dark:text-white">
            <Info className="h-5 w-5 text-amber-500" />
            <h4 className="font-display text-base font-bold">{t.labelFacts}</h4>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.facts.map((fact, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300"
              >
                <span className="font-semibold text-cyan-600 dark:text-cyan-400 block mb-1">
                  #{index + 1}
                </span>
                {fact}
              </div>
            ))}
          </div>
        </div>

        {/* Card 6: Safety Warnings (Only rendered if relevant warnings exist) */}
        {data.warnings && data.warnings.length > 0 && (
          <div className="flex flex-col rounded-2xl border border-red-200/80 bg-red-50/40 p-6 shadow-sm dark:border-red-900/50 dark:bg-red-950/20 md:col-span-2">
            <div className="mb-3 flex items-center gap-2.5 text-red-700 dark:text-red-400">
              <ShieldAlert className="h-5 w-5" />
              <h4 className="font-display text-base font-bold">{t.labelWarnings}</h4>
            </div>
            <ul className="space-y-2 text-sm text-red-900 dark:text-red-200">
              {data.warnings.map((warn, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
