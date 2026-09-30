import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Send, MessageSquare, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage, Language, AnalysisData } from '../types';
import { getTranslation } from '../utils/translations';
import { sendChatMessageApi } from '../services/api';

interface FollowUpChatProps {
  language: Language;
  imageBase64: string;
  mimeType: string;
  analysisData: AnalysisData;
}

export const FollowUpChat: React.FC<FollowUpChatProps> = ({
  language,
  imageBase64,
  mimeType,
  analysisData,
}) => {
  const t = getTranslation(language);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    t.qWhatIsIt,
    t.qHowUseful,
    t.qHowToUse,
    t.qWhichModel,
    t.qOtherTypes,
    t.qExplainSimple,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_u`,
      role: 'user',
      content: q,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const contextSummary = `Identified: ${analysisData.title}. Category: ${analysisData.category}. Summary: ${analysisData.shortSummary}. Characteristics: ${analysisData.characteristics.join(', ')}. Purpose: ${analysisData.purpose}.`;

      const reply = await sendChatMessageApi(
        imageBase64,
        mimeType,
        language,
        q,
        [...messages, userMessage],
        contextSummary
      );

      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_a`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_err`,
        role: 'assistant',
        content: err?.message || t.errorGeneric,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(inputQuestion);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
              {t.chatTitle}
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {analysisData.title}
            </span>
          </div>
        </div>
      </div>

      {/* Messages List Area */}
      <div className="max-h-[420px] min-h-[160px] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400">
            <Bot className="mb-2 h-10 w-10 text-cyan-500/40" />
            <p className="text-xs max-w-sm">
              {t.chatPlaceholder}
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                      : 'border border-slate-100 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {msg.content}
                </div>
                {isUser && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/80">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-500" />
              <span>AI javob yozmoqda...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Suggestion Chips */}
      <div className="border-t border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
          {t.chatQuickQuestions}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => handleSend(q)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400 transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-slate-100 p-4 dark:border-slate-800"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder={t.chatPlaceholder}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-800 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputQuestion.trim() || isLoading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-xs hover:bg-cyan-600 disabled:opacity-40 transition-all active:scale-95"
          aria-label={t.chatSend}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
};
