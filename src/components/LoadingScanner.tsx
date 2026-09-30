import React, { useState, useEffect } from 'react';
import { Eye, Cpu, Search, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface LoadingScannerProps {
  language: Language;
}

export const LoadingScanner: React.FC<LoadingScannerProps> = ({ language }) => {
  const t = getTranslation(language);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    t.scannerReady,
    t.scannerAnalyzing,
    t.scannerFeatures,
    t.scannerFinalizing,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="relative flex flex-col items-center justify-center py-6 text-center">
      {/* Central Holographic Pulsing Radar Icon */}
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
        {/* Outer rotating pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/40 animate-spin [animation-duration:8s]" />
        {/* Middle pulsing halo */}
        <div className="absolute inset-2 rounded-full bg-cyan-500/10 blur-md animate-pulse" />
        {/* Core glowing badge */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30">
          <Eye className="h-8 w-8 text-white animate-pulse" />
        </div>
      </div>

      {/* Dynamic Animated Status Text */}
      <div className="h-7">
        <p className="font-display text-base font-semibold text-slate-800 transition-all duration-300 dark:text-slate-100">
          {steps[stepIndex]}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-cyan-600 dark:text-cyan-400">
        <Sparkles className="h-3.5 w-3.5 animate-spin" />
        <span className="font-mono tracking-wider">GEMINI_MULTIMODAL_INFERENCE</span>
      </div>

      {/* Progress dots indicator */}
      <div className="mt-5 flex items-center gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === stepIndex
                ? 'w-6 bg-cyan-500'
                : 'w-1.5 bg-slate-300 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
