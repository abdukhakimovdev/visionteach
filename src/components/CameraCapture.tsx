import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Check, X, SwitchCamera, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface CameraCaptureProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onPhotoCaptured: (base64: string, fileInfo: { name: string; size: number; mimeType: string }) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  language,
  isOpen,
  onClose,
  onPhotoCaptured,
}) => {
  const t = getTranslation(language);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  // Initialize camera stream
  const startCamera = async (mode: 'environment' | 'user') => {
    setCameraError(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('No mediaDevices');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play().catch((e) => console.log('Autoplay prevented:', e));
      }

      // Check device count for switch camera button
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === 'videoinput');
      setHasMultipleCameras(videoDevices.length > 1);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(t.cameraDenied);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null);
      startCamera(facingMode);
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // If front camera, mirror image for natural selfie, or draw directly
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);

    // Stop live stream while reviewing photo
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera(facingMode);
  };

  const handleUsePhoto = () => {
    if (!capturedImage) return;

    // Approximate size from base64 length
    const approxSize = Math.round((capturedImage.length * 3) / 4);
    const now = new Date();
    const fileName = `VisionAI_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}_${now.getHours()}${now.getMinutes()}.jpg`;

    onPhotoCaptured(capturedImage, {
      name: fileName,
      size: approxSize,
      mimeType: 'image/jpeg',
    });
    onClose();
  };

  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 text-white">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-cyan-400" />
            <h3 className="font-display font-semibold text-base">{t.cameraTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label={t.cameraClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Viewport / Frame */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-black flex items-center justify-center">
          {cameraError ? (
            <div className="flex max-w-md flex-col items-center p-6 text-center text-slate-300">
              <AlertTriangle className="mb-3 h-10 w-10 text-amber-400" />
              <p className="font-medium text-white">{cameraError}</p>
              <p className="mt-2 text-xs text-slate-400">{t.cameraDeniedHelp}</p>
              <button
                onClick={() => startCamera(facingMode)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-500"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{t.btnTryAgain}</span>
              </button>
            </div>
          ) : capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured"
              className="h-full w-full object-contain"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`h-full w-full object-cover ${facingMode === 'user' ? '-scale-x-100' : ''}`}
              />

              {/* Viewfinder Overlay Guides */}
              <div className="pointer-events-none absolute inset-8 border border-white/20 rounded-xl">
                <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-400" />
              </div>

              {/* Camera Switch Toggle Button */}
              {hasMultipleCameras && (
                <button
                  onClick={toggleFacingMode}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/70 text-white backdrop-blur-md hover:bg-slate-800 transition-colors"
                  title={t.cameraSwitch}
                >
                  <SwitchCamera className="h-5 w-5 text-cyan-300" />
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            {t.cameraClose}
          </button>

          <div className="flex items-center gap-3">
            {capturedImage ? (
              <>
                <button
                  onClick={handleRetake}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>{t.cameraRetake}</span>
                </button>

                <button
                  onClick={handleUsePhoto}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Check className="h-4 w-4" />
                  <span>{t.cameraUsePhoto}</span>
                </button>
              </>
            ) : (
              !cameraError && (
                <button
                  onClick={handleCapture}
                  className="group flex h-14 w-14 items-center justify-center rounded-full border-4 border-cyan-500/30 bg-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                  aria-label={t.cameraCapture}
                >
                  <div className="h-10 w-10 rounded-full bg-cyan-500 transition-transform group-hover:scale-95" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
