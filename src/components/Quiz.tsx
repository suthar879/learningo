import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import Loader from "./Loader";
import { saveResult } from "../redux/slices";

import type { LearningState } from "../types/language";

const Quiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { words, loading } = useSelector(
    (state: { root: LearningState }) => state.root
  );

  console.log("WORDS :=> ", words);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  useEffect(() => {
    // Save results to redux whenever they change
    dispatch(saveResult(results));
  }, [results]);

  const handleNext = () => {
    const updatedResults = [...results, selectedAnswer];
    setResults(updatedResults);
    setSelectedAnswer("");

    if (currentIndex === words.length - 1) {
      navigate("/result");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (loading) return <Loader />;

  if (!words.length) {
    return (
      <div className="text-center mt-20">
        <p className="text-muted-foreground">
          No quiz data found. Please start learning first.
        </p>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-6 text-center space-y-2">
        <h1 className="text-2xl font-bold">Quiz Time 🧠</h1>
        <p className="text-sm text-muted-foreground">
          Choose the correct meaning
        </p>
      </div>

      {/* Progress */}
      <div className="mb-4 space-y-1">
        <Progress value={progress} />
        <p className="text-xs text-muted-foreground text-right">
          {currentIndex + 1} / {words.length}
        </p>
      </div>

      {/* Question Card */}
      <Card>
        <CardContent className="py-8 space-y-6">
          <h2 className="text-xl font-semibold text-center">
            {currentWord.word}
          </h2>

          <RadioGroup
            value={selectedAnswer}
            onValueChange={setSelectedAnswer}
            className="space-y-3"
          >
            {currentWord.options.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-3 rounded-md border p-3 hover:bg-muted transition"
              >
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="cursor-pointer text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Action */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleNext} disabled={!selectedAnswer}>
          {currentIndex === words.length - 1 ? "Submit Quiz" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
