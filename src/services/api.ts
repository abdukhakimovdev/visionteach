import { AnalysisData, Language, ChatMessage } from '../types';

export interface AnalyzeResponse {
  success: boolean;
  data: AnalysisData;
  error?: string;
  code?: string;
}

export interface ChatResponse {
  success: boolean;
  answer: string;
  error?: string;
  code?: string;
}

export async function checkBackendHealth() {
  try {
    const res = await fetch('/api/health');
    return await res.json();
  } catch (err) {
    return { status: 'error', hasApiKey: false };
  }
}

export async function analyzeImageApi(
  imageBase64: string,
  mimeType: string,
  language: Language
): Promise<AnalysisData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64,
        mimeType,
        language,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await response.json();

    if (!response.ok || !json.success) {
      const err = new Error(json.error || 'Server error occurred during visual analysis');
      (err as any).code = json.code;
      throw err;
    }

    return json.data as AnalysisData;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Tahlil vaqti tugadi (Timeout). Iltimos, qaytadan urinib ko‘ring.');
    }
    throw error;
  }
}

export async function sendChatMessageApi(
  imageBase64: string,
  mimeType: string,
  language: Language,
  question: string,
  history: ChatMessage[],
  analysisContext: string
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64,
        mimeType,
        language,
        question,
        history: history.map((m) => ({ role: m.role, content: m.content })),
        analysisContext,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json.error || 'Xatolik yuz berdi');
    }

    return json.answer;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Javob kutish vaqti tugadi.');
    }
    throw error;
  }
}
