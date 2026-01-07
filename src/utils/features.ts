import { generate } from "random-words";
import axios from "axios";
import _, { mean } from "lodash";
import type { LanguageCode, Word } from "../types/language";

export const translateWords = async (params: LanguageCode): Promise<Word[]> => {
  try {
    const generatedWords = generate(10);
    const wordsArray = Array.isArray(generatedWords)
      ? generatedWords
      : [generatedWords];

    const requestPayload = wordsArray.map((word) => ({ text: word }));

    const response = await axios.post(
      import.meta.env.VITE_RAPID_API_GOOGLE_TRANSLATE_URL,
      {
        from: "auto",
        to: params,
        json: requestPayload,
      },
      {
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
          "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
          "Content-Type": "application/json",
        },
      }
    );

    const translatedTexts: string[] = response.data.trans.map(
      (item: any) => item.text
    );

    const result: Word[] = wordsArray.map((word, index) => ({
      word,
      meaning: translatedTexts[index],
      options: generateMCQOptions(translatedTexts, index),
    }));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Translation failed");
  }
};

const generateMCQOptions = (
  meanings: string[],
  correctIndex: number
): string[] => {
  const correctAnswer = meanings[correctIndex];

  const incorrectAnswers = _.sampleSize(
    meanings.filter((_, i) => i !== correctIndex),
    3
  );

  return _.shuffle([...incorrectAnswers, correctAnswer]);
};

export const countMatchedAnswers = (arr1: string[], arr2: string[]): number => {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must be of the same length");
  }

  let matchingCount = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      matchingCount++;
    }
  }

  return matchingCount;
};
