import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { MoveLeft, Volume2 } from "lucide-react";
import { translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slices";
import Loader from "./Loader";

import {
  speechLangMap,
  type LanguageCode,
  type LearningState,
} from "../types/language";
import { speakText } from "../utils/speak";

const Learning = () => {
  const [count, setCount] = useState(0);
  const [searchParams] = useSearchParams();
  const language = searchParams.get("language") as LanguageCode;
  const [speaking, setSpeaking] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { words, loading } = useSelector(
    (state: { root: LearningState }) => state.root
  );

  useEffect(() => {
    dispatch(getWordsRequest());

    translateWords(language || "hi")
      .then((arr) => dispatch(getWordsSuccess(arr)))
      .catch((err) => dispatch(getWordsFail(err)));

    // Do not clear words on unmount so Quiz can access them after
    // navigating from Learning to Quiz.
  }, []);

  const speak = () => {
    setSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(currentWord.meaning);
    utterance.lang = speechLangMap[language || "en"];
    utterance.onend = () => setSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  if (loading) return <Loader />;

  if (!words.length) return null;

  const currentWord = words[count];
  const progress = ((count + 1) / words.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            count === 0 ? navigate("/") : setCount((prev) => prev - 1)
          }
        >
          <MoveLeft className="h-5 w-5" />
        </Button>

        <p className="text-sm text-muted-foreground">Learning made easy</p>
      </div>

      {/* Progress */}
      <div className="mb-4 space-y-1">
        <Progress value={progress} />
        <p className="text-xs text-muted-foreground text-right">
          {count + 1} / {words.length}
        </p>
      </div>

      {/* Learning Card */}
      <Card>
        <CardContent className="py-10 text-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {currentWord.word}
            </h2>
            <p className="mt-2 text-lg text-primary">{currentWord.meaning}</p>
          </div>

          <Button variant="outline" size="icon" onClick={speak}>
            <Volume2 className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      {/* Action */}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={() =>
            count === words.length - 1
              ? navigate("/quiz")
              : setCount((prev) => prev + 1)
          }
        >
          {count === words.length - 1 ? "Start Quiz" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Learning;
