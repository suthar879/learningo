import { generate } from "random-words";
import axios from "axios";

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
      (item: any, index: number) => ({
        word: words[index].text,
        meaning: item.text,
        options: ["sample"],
      })
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Translation failed " + error);
  }
};
