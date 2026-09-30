import React from 'react';
import { AnalysisData, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface PrintReportProps {
  data: AnalysisData | null;
  imageSrc: string | null;
  language: Language;
}

export const PrintReport: React.FC<PrintReportProps> = ({
  data,
  imageSrc,
  language,
}) => {
  if (!data || !imageSrc) return null;
  const t = getTranslation(language);

  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="hidden print-only text-slate-900 p-8 font-sans">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">VisionAI</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
            Visual Intelligence & Image Analysis Report
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <div>{currentDate}</div>
          <div className="font-semibold text-slate-700">Lang: {language.toUpperCase()}</div>
        </div>
      </div>

      {/* Top Main Block: Image & Identification */}
      <div className="grid grid-cols-3 gap-6 mb-6 card-print p-4 rounded-lg bg-slate-50">
        <div className="col-span-1">
          <img
            src={imageSrc}
            alt={data.title}
            className="w-full h-48 object-cover rounded border border-slate-300"
          />
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
            {data.category}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">{data.title}</h2>
          <div className="text-xs font-semibold text-emerald-700 mt-1">
            {t.badgeConfidence}: {data.confidence}
          </div>
          <p className="text-sm text-slate-700 mt-2 leading-relaxed">
            {data.shortSummary}
          </p>
        </div>
      </div>

      {/* Uncertainty Notice if present */}
      {data.uncertaintyNote && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900">
          <strong>Diqqat:</strong> {data.uncertaintyNote}
        </div>
      )}

      {/* Sections */}
      <div className="space-y-4 text-xs">
        {/* Description */}
        <div className="card-print p-4 rounded border border-slate-200">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-200 pb-1">
            {t.labelDescription}
          </h3>
          <p className="text-slate-700 leading-relaxed">{data.description}</p>
        </div>

        {/* Characteristics & Purpose */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card-print p-4 rounded border border-slate-200">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-200 pb-1">
              {t.labelCharacteristics}
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-slate-700">
              {data.characteristics.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card-print p-4 rounded border border-slate-200">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-200 pb-1">
              {t.labelPurpose}
            </h3>
            <p className="text-slate-700 leading-relaxed">{data.purpose}</p>
            {data.materials && data.materials.length > 0 && (
              <div className="mt-2 text-slate-600">
                <strong>{t.labelMaterials}:</strong> {data.materials.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* How to use */}
        <div className="card-print p-4 rounded border border-slate-200">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-200 pb-1">
            {t.labelHowToUse}
          </h3>
          <ol className="list-decimal pl-4 space-y-1 text-slate-700">
            {data.howToUse.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Facts */}
        <div className="card-print p-4 rounded border border-slate-200">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5 border-b border-slate-200 pb-1">
            {t.labelFacts}
          </h3>
          <ul className="list-disc pl-4 space-y-1 text-slate-700">
            {data.facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>

        {/* Warnings */}
        {data.warnings && data.warnings.length > 0 && (
          <div className="card-print p-4 rounded border border-red-300 bg-red-50 text-red-900">
            <h3 className="font-bold uppercase tracking-wider mb-1.5 pb-1 border-b border-red-200">
              {t.labelWarnings}
            </h3>
            <ul className="list-disc pl-4 space-y-1">
              {data.warnings.map((warn, i) => (
                <li key={i}>{warn}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-slate-300 text-center text-[10px] text-slate-500">
        Generated by VisionAI Multi-Modal Engine · {t.tagline}
      </div>
    </div>
  );
};
