import React, { useState } from 'react';
import { Eye, History, Sun, Moon, Monitor, Menu, X, Sparkles } from 'lucide-react';
import { Language, Theme } from '../types';
import { getTranslation } from '../utils/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  historyCount: number;
  onOpenHistory: () => void;
  onNavigate: (section: 'hero' | 'analyzer' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  historyCount,
  onOpenHistory,
  onNavigate,
}) => {
  const t = getTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          onClick={() => {
            onNavigate('hero');
            setMobileMenuOpen(false);
          }}
          className="group flex cursor-pointer items-center gap-2.5 transition-transform active:scale-95"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 shadow-md shadow-cyan-500/20 transition-all duration-300 group-hover:shadow-cyan-500/35">
            <Eye className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 opacity-0 blur transition-opacity duration-300 group-hover:opacity-60" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Vision<span className="text-cyan-500">AI</span>
            </span>
            <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Visual Intelligence
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <button
            onClick={() => onNavigate('hero')}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
          >
            {t.navHome}
          </button>
          <button
            onClick={() => onNavigate('analyzer')}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
          >
            {t.navAnalyze}
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
          >
            {t.navAbout}
          </button>

          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
          >
            <History className="h-4 w-4" />
            <span>{t.navHistory}</span>
            {historyCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500/10 px-1.5 text-xs font-semibold text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                {historyCount}
              </span>
            )}
          </button>
        </nav>

        {/* Controls: Language Selector & Theme Switcher */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Language Selector (Segmented buttons - no pill slop) */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100/80 p-0.5 dark:border-slate-800 dark:bg-slate-900/80">
            {languages.map((l) => {
              const active = language === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  className={`px-2.5 py-1 text-xs font-semibold transition-all ${
                    active
                      ? 'rounded-md bg-white text-cyan-600 shadow-sm dark:bg-slate-800 dark:text-cyan-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                  aria-label={`Switch language to ${l.label}`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>

          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Toggle theme mode"
              title="Theme"
            >
              {theme === 'light' && <Sun className="h-4 w-4 text-amber-500" />}
              {theme === 'dark' && <Moon className="h-4 w-4 text-cyan-400" />}
              {theme === 'system' && <Monitor className="h-4 w-4 text-slate-500 dark:text-slate-400" />}
            </button>

            {themeDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl transition-all duration-150 dark:border-slate-800 dark:bg-slate-900"
                onClick={() => setThemeDropdownOpen(false)}
              >
                <button
                  onClick={() => onThemeChange('light')}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    theme === 'light'
                      ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  <span>{t.themeLight}</span>
                </button>
                <button
                  onClick={() => onThemeChange('dark')}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Moon className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{t.themeDark}</span>
                </button>
                <button
                  onClick={() => onThemeChange('system')}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    theme === 'system'
                      ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5 text-slate-500" />
                  <span>{t.themeSystem}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenHistory}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300"
            aria-label="History"
          >
            <History className="h-4 w-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-3 pb-5 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onNavigate('hero');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <span>{t.navHome}</span>
            </button>
            <button
              onClick={() => {
                onNavigate('analyzer');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <span>{t.navAnalyze}</span>
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <span>{t.navAbout}</span>
            </button>

            <div className="my-1 border-t border-slate-200 dark:border-slate-800" />

            {/* Mobile Language and Theme Row */}
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-900">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => onLanguageChange(l.code)}
                    className={`px-3 py-1 text-xs font-semibold ${
                      language === l.code
                        ? 'rounded-md bg-white text-cyan-600 shadow-xs dark:bg-slate-800 dark:text-cyan-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-900">
                <button
                  onClick={() => onThemeChange('light')}
                  className={`p-1.5 ${
                    theme === 'light' ? 'rounded-md bg-white text-amber-500 shadow-xs dark:bg-slate-800' : 'text-slate-400'
                  }`}
                  title="Light mode"
                >
                  <Sun className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onThemeChange('dark')}
                  className={`p-1.5 ${
                    theme === 'dark' ? 'rounded-md bg-white text-cyan-400 shadow-xs dark:bg-slate-800' : 'text-slate-400'
                  }`}
                  title="Dark mode"
                >
                  <Moon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onThemeChange('system')}
                  className={`p-1.5 ${
                    theme === 'system' ? 'rounded-md bg-white text-slate-700 shadow-xs dark:bg-slate-800 dark:text-white' : 'text-slate-400'
                  }`}
                  title="System mode"
                >
                  <Monitor className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
