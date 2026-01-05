import { generate } from "random-words";
import axios from "axios";
import _, { mean } from "lodash";

type LanguageType =
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

type wordType = {
  word: string;
  meaning: string;
  options: string[];
};

const generateMCQOptions = (
  meaning: { Text: string }[],
  index: number
): string[] => {
  const correctAnswer = meaning[index].Text;
  const allMeaningExceptForCorrect = meaning.filter(
    (i) => i.Text !== correctAnswer
  );
  const incorrectAnswers: string[] = _.sampleSize(
    allMeaningExceptForCorrect,
    3
  ).map((i) => i.Text);

  const generateMCQOptions = _.shuffle([...incorrectAnswers, correctAnswer]);

  return generateMCQOptions;
};

export const translateWords = async (
  params: LanguageType
): Promise<wordType[]> => {
  try {
    const generatedWords = generate(10);
    const words = (
      Array.isArray(generatedWords) ? generatedWords : [generatedWords]
    ).map((word: any) => ({ text: word }));

    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_GOOGLE_TRANSLATE_URL,
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
        "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
        "Content-Type": "application/json",
      },
      data: {
        from: "auto",
        to: params,
        json: words,
      },
    };
    const response = await axios.request(options);
    console.log(response.data);
    const result: wordType[] = response.data.trans.map(
      (item: any, index: number) => {
        const options: string[] = generateMCQOptions(words, index);

        return {
          word: words[index].text,
          meaning: item.text,
          options,
        };
      }
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Translation failed " + error);
  }
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
