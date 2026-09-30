import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImageUploader } from './components/ImageUploader';
import { CameraCapture } from './components/CameraCapture';
import { ImagePreview } from './components/ImagePreview';
import { AnalysisResult } from './components/AnalysisResult';
import { FollowUpChat } from './components/FollowUpChat';
import { HistoryDrawer } from './components/HistoryDrawer';
import { AboutSection } from './components/AboutSection';
import { PrintReport } from './components/PrintReport';
import { Footer } from './components/Footer';

import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import { useHistory } from './hooks/useHistory';
import { analyzeImageApi } from './services/api';
import { AnalysisData, HistoryItem } from './types';
import { SampleItem } from './utils/samples';
import { getTranslation } from './utils/translations';
import { AlertCircle, RefreshCw, Upload, Camera } from 'lucide-react';

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { history, addHistoryItem, deleteHistoryItem, clearHistory } = useHistory();

  // State
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
    mimeType: string;
  } | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Section refs for smooth navigation
  const heroRef = useRef<HTMLDivElement>(null);
  const analyzerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: 'hero' | 'analyzer' | 'about') => {
    if (section === 'hero') {
      heroRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'analyzer') {
      analyzerRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select an image from file picker
  const handleImageSelected = (
    base64: string,
    file: { name: string; size: number; mimeType: string }
  ) => {
    setCurrentImageSrc(base64);
    setFileInfo(file);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  // Select sample image
  const handleSelectSample = async (sample: SampleItem) => {
    try {
      setErrorMessage(null);
      // Fetch sample image and convert to base64
      const response = await fetch(sample.imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCurrentImageSrc(base64);
        setFileInfo({
          name: `${sample.name[language]}.jpg`,
          size: blob.size,
          mimeType: sample.mimeType,
        });
        setAnalysisResult(null);
        handleNavigate('analyzer');
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      console.error('Failed to load sample image:', e);
      setCurrentImageSrc(sample.imageUrl);
      setFileInfo({
        name: `${sample.name[language]}.jpg`,
        size: 350000,
        mimeType: sample.mimeType,
      });
      setAnalysisResult(null);
      handleNavigate('analyzer');
    }
  };

  // Perform AI Visual Analysis
  const handleAnalyze = async () => {
    if (!currentImageSrc || !fileInfo) return;

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const data = await analyzeImageApi(currentImageSrc, fileInfo.mimeType, language);
      setAnalysisResult(data);

      // Save to localStorage history
      await addHistoryItem(
        data,
        currentImageSrc,
        fileInfo.name,
        fileInfo.size,
        language
      );
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err?.message || t.errorGeneric);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset/Remove image
  const handleRemoveImage = () => {
    setCurrentImageSrc(null);
    setFileInfo(null);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  // Restore previous item from history
  const handleSelectHistoryItem = (item: HistoryItem) => {
    setCurrentImageSrc(item.imageThumbnail);
    setFileInfo({
      name: item.fileName,
      size: item.fileSize,
      mimeType: 'image/jpeg',
    });
    setAnalysisResult(item.data);
    setErrorMessage(null);
    handleNavigate('analyzer');
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 flex flex-col justify-between">
      {/* Screen view content (hidden during print) */}
      <div className="no-print w-full flex-1">
        {/* Navigation Header */}
        <Header
          language={language}
          onLanguageChange={setLanguage}
          theme={theme}
          onThemeChange={setTheme}
          historyCount={history.length}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Hero Section */}
        <div ref={heroRef}>
          <Hero
            language={language}
            onStartAnalyze={() => handleNavigate('analyzer')}
            onSelectSample={handleSelectSample}
          />
        </div>

        {/* Main Analyzer Section */}
        <section
          ref={analyzerRef}
          className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
        >
          {/* Section Header */}
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {analysisResult ? t.resultTitle : t.uploadTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {analysisResult
                ? t.tagline
                : t.dropzoneSubtext}
            </p>
          </div>

          {/* Error Banner with helpful recovery actions */}
          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 p-5 text-red-900 shadow-sm dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200 animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 shrink-0 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">
                    {errorMessage}
                  </h4>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleAnalyze}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500 transition-colors"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>{t.btnTryAgain}</span>
                    </button>
                    <button
                      onClick={handleRemoveImage}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-red-300 bg-white px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 dark:border-red-800 dark:bg-slate-900 dark:text-red-300 transition-colors"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>{t.btnUploadAnother}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* State 1: No image uploaded yet -> Show ImageUploader */}
          {!currentImageSrc && (
            <div className="w-full">
              <ImageUploader
                language={language}
                onImageSelected={handleImageSelected}
                onOpenCamera={() => setIsCameraOpen(true)}
              />
            </div>
          )}

          {/* State 2: Image is uploaded, ready to analyze or currently analyzing */}
          {currentImageSrc && fileInfo && !analysisResult && (
            <ImagePreview
              language={language}
              imageSrc={currentImageSrc}
              fileInfo={fileInfo}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyze}
              onRemove={handleRemoveImage}
              onReplace={handleRemoveImage}
            />
          )}

          {/* State 3: Analysis Complete -> Show Result Dashboard and FollowUpChat */}
          {analysisResult && currentImageSrc && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <AnalysisResult
                data={analysisResult}
                language={language}
                imageSrc={currentImageSrc}
                onNewAnalysis={handleRemoveImage}
                onPrintReport={handlePrintReport}
              />

              {/* Follow-up Interactive AI Chat */}
              <FollowUpChat
                language={language}
                imageBase64={currentImageSrc}
                mimeType={fileInfo?.mimeType || 'image/jpeg'}
                analysisData={analysisResult}
              />
            </div>
          )}
        </section>

        {/* About Section */}
        <div ref={aboutRef}>
          <AboutSection language={language} />
        </div>
      </div>

      {/* Hidden during screen, visible in window.print() */}
      <PrintReport
        data={analysisResult}
        imageSrc={currentImageSrc}
        language={language}
      />

      {/* Camera Capture Modal */}
      <CameraCapture
        language={language}
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onPhotoCaptured={handleImageSelected}
      />

      {/* History Slide-over Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        language={language}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onDeleteItem={deleteHistoryItem}
        onClearAll={clearHistory}
      />

      {/* Footer */}
      <Footer language={language} onNavigate={handleNavigate} />
    </div>
  );
}
