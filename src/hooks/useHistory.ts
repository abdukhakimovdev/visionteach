import { useState, useEffect } from 'react';
import { HistoryItem, AnalysisData, Language } from '../types';

const HISTORY_STORAGE_KEY = 'visionai_analysis_history';
const MAX_HISTORY_ITEMS = 30;

// Helper to create a thumbnail data URL to conserve localStorage space
function createThumbnail(imageSrc: string, maxSize = 300): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
          return;
        }
      } catch (err) {
        console.warn('Could not compress thumbnail:', err);
      }
      resolve(imageSrc);
    };
    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse history:', e);
    }
    return [];
  });

  const saveHistoryToStorage = (items: HistoryItem[]) => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('LocalStorage quota might be reached, keeping newest items:', e);
      // Prune to half if quota reached
      const pruned = items.slice(0, 10);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(pruned));
      } catch (inner) {
        console.error('LocalStorage write failed:', inner);
      }
    }
  };

  const addHistoryItem = async (
    data: AnalysisData,
    imageSrc: string,
    fileName: string,
    fileSize: number,
    language: Language
  ) => {
    const thumbnail = await createThumbnail(imageSrc, 320);

    const now = new Date();
    const dateStr = now.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newItem: HistoryItem = {
      id: `vis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      dateStr,
      language,
      imageThumbnail: thumbnail,
      fileName: fileName || 'VisionAI_Capture.jpg',
      fileSize,
      data,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.filter((i) => i.id !== newItem.id)].slice(0, MAX_HISTORY_ITEMS);
      saveHistoryToStorage(updated);
      return updated;
    });

    return newItem;
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveHistoryToStorage(updated);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    history,
    addHistoryItem,
    deleteHistoryItem,
    clearHistory,
  };
}
