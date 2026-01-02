import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { MoveLeft, Volume } from "lucide-react";
import { translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
  clearState,
} from "../redux/slices";
import Loader from "./Loader";

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

type stateType = {
  loading: boolean;
  result: string[];
  error?: string;
  words: wordType[];
};

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const params = useSearchParams()[0].get("language") as LanguageType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { words, loading, error } = useSelector(
    (state: { root: stateType }) => state.root
  );

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params || "hi")
      .then((arr: wordType[]) => {
        console.log("Translated ==> ", arr);
        dispatch(getWordsSuccess(arr));
      })
      .catch((err) => {
        console.error(err);
        dispatch(getWordsFail(err));
      });

    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, []);

  if (loading) <Loader />;

  return (
    <div>
      <Button
        onClick={() =>
          count === 0 ? navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <MoveLeft className="h-4 w-4 text-gray-600" />
      </Button>
      <p>Learning made easy</p>
      <div>
        <h4>
          {count + 1} - {words[count]?.word}
        </h4>{" "}
        :<h4 className="text-blue-500"> {words[count]?.meaning}</h4>
        <Button>
          <Volume className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
      <Button
        onClick={
          count === words.length - 1 ? () => navigate("/quiz") : nextHandler
        }
      >
        {count === words.length - 1 ? "Text" : "Next"}
      </Button>
    </div>
  );
};

export default Learning;
