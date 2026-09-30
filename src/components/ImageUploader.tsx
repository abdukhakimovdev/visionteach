import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface ImageUploaderProps {
  language: Language;
  onImageSelected: (base64: string, file: { name: string; size: number; mimeType: string }) => void;
  onOpenCamera: () => void;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  language,
  onImageSelected,
  onOpenCamera,
}) => {
  const t = getTranslation(language);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMessage(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrorMessage(t.errInvalidFormat);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(t.errFileTooLarge);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageSelected(result, {
          name: file.name,
          size: file.size,
          mimeType: file.type || 'image/jpeg',
        });
      }
    };
    reader.onerror = () => {
      setErrorMessage(t.errorGeneric);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="w-full">
      {errorMessage && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 animate-in fade-in duration-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <div className="flex-1">{errorMessage}</div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-xs font-semibold underline hover:text-red-900 dark:hover:text-red-100"
          >
            Yopish
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
        id="image-file-input"
      />

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-cyan-500 bg-cyan-50/50 dark:border-cyan-400 dark:bg-cyan-950/20 scale-[1.01]'
            : 'border-slate-300 bg-white/60 hover:border-cyan-400/80 hover:bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900/70'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-100 text-cyan-600 shadow-sm transition-transform duration-300 group-hover:scale-110 dark:from-cyan-950/60 dark:to-blue-900/40 dark:text-cyan-400">
          <UploadCloud className="h-8 w-8" />
        </div>

        <h3 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100">
          {t.dropzoneText}
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t.dropzoneSubtext}
        </p>

        {/* Action Buttons */}
        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            <ImageIcon className="h-4 w-4" />
            <span>{t.btnUpload}</span>
          </button>

          <button
            type="button"
            onClick={onOpenCamera}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-100 hover:text-slate-900 hover:scale-[1.02] active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <Camera className="h-4 w-4 text-cyan-500" />
            <span>{t.btnCamera}</span>
          </button>
        </div>

        <div className="mt-6 text-xs text-slate-400 dark:text-slate-500">
          {t.supportedFormats}
        </div>
      </div>
    </div>
  );
};
