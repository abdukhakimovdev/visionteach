export type Language = 'uz' | 'ru' | 'en';
export type Theme = 'light' | 'dark' | 'system';

export interface AnalysisData {
  title: string;
  category: string;
  shortSummary: string;
  description: string;
  characteristics: string[];
  purpose: string;
  materials: string[];
  howToUse: string[];
  facts: string[];
  warnings?: string[];
  confidence: string;
  isUncertain: boolean;
  uncertaintyNote?: string;
  alternatives?: string[];
  simplifiedExplanation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  dateStr: string;
  language: Language;
  imageThumbnail: string; // Base64 thumbnail or full image data
  fileName: string;
  fileSize: number;
  data: AnalysisData;
}
