import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Scan } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';
import { SAMPLE_IMAGES, SampleItem } from '../utils/samples';

interface HeroProps {
  language: Language;
  onStartAnalyze: () => void;
  onSelectSample: (sample: SampleItem) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onStartAnalyze, onSelectSample }) => {
  const t = getTranslation(language);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* Background glow and subtle mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[480px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-600/5 blur-3xl dark:from-cyan-500/15 dark:via-blue-600/15 dark:to-indigo-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines & CTA */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Subtle editorial indicator (Anti-slop: clean text, no garish pill sandwiches) */}
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-cyan-600 uppercase dark:text-cyan-400">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>Multimodal Vision Intelligence</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>Gemini 3.8 Flash</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              {t.tagline}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {t.heroSubtitle}
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartAnalyze}
                className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Scan className="h-4 w-4" />
                <span>{t.uploadTitle}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Maxfiy & Xavfsiz</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>Tezkor Natija</span>
                </span>
              </div>
            </div>

            {/* Sample Image Quick Starters */}
            <div className="mt-10 w-full pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                {t.tryDemo}:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SAMPLE_IMAGES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => onSelectSample(sample)}
                    className="group relative flex flex-col text-left p-2 rounded-xl border border-slate-200 bg-white/70 hover:border-cyan-400/60 hover:bg-cyan-50/30 transition-all duration-200 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-500/40 dark:hover:bg-cyan-950/20"
                  >
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2">
                      <img
                        src={sample.imageUrl}
                        alt={sample.name[language]}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                      {sample.name[language]}
                    </span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">
                      {sample.category[language]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Animated Visual Scanner Preview Card */}
          <div className="relative flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xl backdrop-blur-xl transition-all dark:border-slate-800/90 dark:bg-slate-900/90">
              {/* Card Header Bar */}
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">VISION_SCANNER_v3</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-cyan-600 dark:text-cyan-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>SCANNING</span>
                </div>
              </div>

              {/* Main Image Frame with Laser Scanning Line Effect */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
                  alt="Vintage Camera Visual Sample"
                  className="h-full w-full object-cover opacity-85"
                />

                {/* Laser Scanning Line Animation */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanner-bar" />

                {/* Scanner Target Bounding Box / Corners */}
                <div className="pointer-events-none absolute inset-6 border border-cyan-400/40 rounded-lg">
                  <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-cyan-400" />
                </div>

                {/* Live Floating Recognition HUD Badges */}
                <div className="absolute top-4 left-4 rounded-md bg-slate-950/80 px-2.5 py-1 text-[11px] font-mono text-cyan-300 backdrop-blur-md border border-cyan-500/30">
                  CONFIDENCE: 98.4%
                </div>
                <div className="absolute bottom-4 right-4 rounded-md bg-slate-950/80 px-2.5 py-1 text-[11px] font-mono text-white backdrop-blur-md border border-slate-700">
                  OPTICAL SENSOR · LEICA M3
                </div>
              </div>

              {/* Info Cards Beneath Image in Mockup */}
              <div className="mt-3.5 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-cyan-500" />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Vintage Leica M3 Rangefinder
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    Aniqlangan
                  </span>
                </div>

                <div className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 px-1">
                  1954-yilda ishlab chiqarilgan afsonaviy mexanik kamera. Mexanizmi 100% batareyasiz ishlaydi.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
