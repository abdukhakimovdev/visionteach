import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Support up to 25MB json payloads for base64 images (10MB image ~ 13.3MB base64)
app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI client with User-Agent header for AI Studio
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
  });
});

// Image Analysis endpoint
app.post('/api/analyze', async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', language = 'uz' } = req.body;

    if (!imageBase64) {
      res.status(400).json({ error: 'Rasm ma’lumotlari topilmadi / Image data is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error: 'GEMINI_API_KEY sozlanmagan. Iltimos, AI Studio Settings > Secrets bo‘limida kalitni qo‘shing.',
        code: 'MISSING_API_KEY',
      });
      return;
    }

    // Language guidelines
    const langNames: Record<string, string> = {
      uz: "O'zbek tili (Uzbek Latin: o‘, g‘, sh, ch to'g'ri orfografiyasi bilan)",
      ru: 'Русский язык (Russian)',
      en: 'English',
    };
    const targetLangName = langNames[language] || langNames.uz;

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const systemInstruction = `You are VisionAI, a world-class multimodal visual intelligence engine.
Analyze the provided image with utmost precision, scientific accuracy, and clarity.
Identify visible objects, products, plants, animals, food, devices, art, documents, landmarks, or scenes.

CRITICAL RULES:
1. NEVER invent facts or hallucinate details not grounded in the image.
2. If something cannot be determined from the image, explicitly state that it cannot be determined.
3. If the image is unclear, blurry, obscured, or ambiguous, you MUST NOT guess with false confidence. Set isUncertain: true, and in uncertaintyNote clearly state:
   - For Uzbek: "Men to‘liq amin emasman. Rasmda ... ko‘rsatilgan bo‘lishi mumkin." and explain why (e.g. yorug'lik past, burchak noaniq).
   - For Russian: "Я не совсем уверен. На изображении может быть..." and explain why.
   - For English: "I’m not completely sure. The image may show..." and explain why.
4. Respond ENTIRELY in ${targetLangName}. All fields in the JSON response must be in this language.
5. Provide a special 'simplifiedExplanation' field that explains what the subject is in friendly, simple terms suitable for a 10-year-old child or beginner without confusing jargon.`;

    const requestPayload = {
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          {
            text: `Analyze this image in depth. Identify what is shown, its category, key visible characteristics, purpose and function, materials/ingredients/components, how it is commonly used, 3 to 5 interesting facts, any relevant warnings/safety precautions (allergens, hazard, care instructions), and confidence rating.
Output all fields strictly in ${targetLangName}.`,
          },
        ],
      },
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'The specific name or identification of the primary subject in the image',
            },
            category: {
              type: Type.STRING,
              description: 'Category (e.g., O‘simliklar / Oziq-ovqat / Elektronika / Texnika / Hayvonot olami / Arxitektura / Hujjat)',
            },
            shortSummary: {
              type: Type.STRING,
              description: 'A punchy 1-2 sentence overview of what is shown',
            },
            description: {
              type: Type.STRING,
              description: 'Detailed, comprehensive description of the visible subject and scene',
            },
            characteristics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of visible physical traits, colors, textures, parts, or markings',
            },
            purpose: {
              type: Type.STRING,
              description: 'Primary purpose, practical function, or ecological/social role',
            },
            materials: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Identifiable materials, ingredients, or hardware components',
            },
            howToUse: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Step-by-step or common guidelines on how it is operated, used, or maintained',
            },
            facts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 to 5 fascinating, verified facts about this subject',
            },
            warnings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Important safety warnings, precautions, allergens, or maintenance caveats if applicable',
            },
            confidence: {
              type: Type.STRING,
              description: 'Confidence rating (e.g. "Yuqori ishonch (96%)", "O‘rtacha ishonch (65%)", "Past ishonch (35%)")',
            },
            isUncertain: {
              type: Type.BOOLEAN,
              description: 'True if the image is low quality, ambiguous, or could be multiple things',
            },
            uncertaintyNote: {
              type: Type.STRING,
              description: 'Explanation if uncertain, beginning with "Men to‘liq amin emasman..." / "Я не совсем уверен..." / "I’m not completely sure..."',
            },
            alternatives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Alternative possibilities or similar items if identification is not 100% conclusive',
            },
            simplifiedExplanation: {
              type: Type.STRING,
              description: 'A beginner/child-friendly simple explanation without complex jargon',
            },
          },
          required: [
            'title',
            'category',
            'shortSummary',
            'description',
            'characteristics',
            'purpose',
            'materials',
            'howToUse',
            'facts',
            'confidence',
            'isUncertain',
            'simplifiedExplanation',
          ],
        },
      },
    };

    // Candidate models to handle transient 503 high demand spikes gracefully
    const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    let lastError: any = null;
    let responseText: string | undefined;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          ...requestPayload,
        });
        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} attempt failed:`, err?.message || err);
        // Wait 800ms before trying next candidate model
        await new Promise((r) => setTimeout(r, 800));
      }
    }

    if (!responseText) {
      throw lastError || new Error('Barcha modellar band. Iltimos qaytadan urinib ko‘ring.');
    }

    const parsed = JSON.parse(responseText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error analyzing image:', error);
    res.status(500).json({
      error: error?.message || 'Tasvirni tahlil qilishda xatolik yuz berdi. Iltimos qaytadan urining.',
      code: 'ANALYSIS_ERROR',
    });
  }
});

// Follow-up Chat endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      imageBase64,
      mimeType = 'image/jpeg',
      language = 'uz',
      question,
      history = [],
      analysisContext = '',
    } = req.body;

    if (!question) {
      res.status(400).json({ error: 'Savol kiritilmadi / Question is required' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error: 'GEMINI_API_KEY sozlanmagan.',
        code: 'MISSING_API_KEY',
      });
      return;
    }

    const langNames: Record<string, string> = {
      uz: "O'zbek tili (Uzbek Latin: o‘, g‘, sh, ch to'g'ri orfografiyasi bilan)",
      ru: 'Русский язык (Russian)',
      en: 'English',
    };
    const targetLangName = langNames[language] || langNames.uz;

    // Prepare contents: pass the image inlineData, context summary, prior turns, and the current question
    const parts: any[] = [];

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64,
        },
      });
    }

    let conversationText = `[Context of previous image analysis]:\n${analysisContext}\n\n`;

    if (Array.isArray(history) && history.length > 0) {
      conversationText += '[Previous conversation]:\n';
      for (const msg of history) {
        conversationText += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      }
      conversationText += '\n';
    }

    conversationText += `[Current User Question]: ${question}\n\nRespond to this question accurately, concisely, and helpfully in ${targetLangName}, strictly referencing the provided image and visual context. Never invent features not present.`;

    parts.push({ text: conversationText });

    const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    let reply = '';
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: { parts },
          config: {
            systemInstruction: `You are VisionAI visual assistant. You are answering follow-up questions from the user about the image they uploaded. Answer strictly in ${targetLangName}. Be helpful, polite, factual, and informative.`,
            temperature: 0.4,
          },
        });
        if (response.text) {
          reply = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Chat model ${model} attempt failed:`, err?.message || err);
        await new Promise((r) => setTimeout(r, 600));
      }
    }

    if (!reply) {
      throw lastError || new Error('Kechirasiz, javob shakllantirib bo‘lmadi.');
    }

    res.json({ success: true, answer: reply });
  } catch (error: any) {
    console.error('Error in chat:', error);
    res.status(500).json({
      error: error?.message || 'Savolga javob berishda xatolik yuz berdi.',
      code: 'CHAT_ERROR',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VisionAI Server running on http://0.0.0.0:${PORT}`);
  });
}

// Export express app for Vercel serverless functions
export default app;

// Only listen on port if not running in a serverless environment (e.g. Vercel)
if (process.env.VERCEL !== '1') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
