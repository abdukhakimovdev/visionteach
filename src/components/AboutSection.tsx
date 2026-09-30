import React from 'react';
import { UploadCloud, Cpu, Lightbulb, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const t = getTranslation(language);

  const steps = [
    {
      step: '01',
      title: t.aboutStep1Title,
      desc: t.aboutStep1Desc,
      icon: UploadCloud,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      step: '02',
      title: t.aboutStep2Title,
      desc: t.aboutStep2Desc,
      icon: Cpu,
      color: 'from-cyan-500 to-indigo-500',
    },
    {
      step: '03',
      title: t.aboutStep3Title,
      desc: t.aboutStep3Desc,
      icon: Lightbulb,
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <span>VisionAI Architecture</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t.aboutHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            {t.aboutIntro}
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${item.color} text-white shadow-md shadow-cyan-500/20`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-200 dark:text-slate-800">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Privacy Card */}
        <div className="mt-12 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-emerald-900 dark:text-emerald-300">
                {t.privacyTitle}
              </h4>
              <p className="mt-0.5 text-xs text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
                {t.privacyNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
