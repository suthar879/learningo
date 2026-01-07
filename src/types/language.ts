export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "zh"
  | "ja"
  | "ru"
  | "ar"
  | "hi"
  | "pt";

export type Word = {
  word: string;
  meaning: string;
  options: string[];
};

export type LearningState = {
  loading: boolean;
  result: string[];
  error?: string;
  words: Word[];
};

export const speechLangMap: Record<LanguageCode, string> = {
  hi: "hi-IN",
  fr: "fr-FR",
  es: "es-ES",
  de: "de-DE",
  ja: "ja-JP",
  en: "en-US",
  zh: "zh-CN",
  ru: "ru-RU",
  ar: "ar-SA",
  pt: "pt-PT",
};
