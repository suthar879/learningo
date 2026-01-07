import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { clearState } from "../redux/slices";
import { countMatchedAnswers } from "../utils/features";
import type { LearningState } from "../types/language";
import { updateStreak } from "../utils/streak";
import confetti from "canvas-confetti";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const streak = updateStreak();

  const { words, result } = useSelector(
    (state: { root: LearningState }) => state.root
  );

  if (!words.length || !result.length) {
    return (
      <div className="text-center mt-20">
        <p className="text-muted-foreground">
          No result data found. Please take a quiz first.
        </p>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    );
  }

  const correctAnswers = countMatchedAnswers(
    result,
    words.map((i) => i.meaning)
  );

  const percentage = Math.round((correctAnswers / words.length) * 100);

  const isPassed = percentage >= 50;

  if (isPassed) {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  const resetHandler = () => {
    dispatch(clearState());
    navigate("/");
  };

  const analytics = {
    correct: correctAnswers,
    total: words.length,
    percentage,
    date: new Date().toISOString(),
  };

  localStorage.setItem("lastResult", JSON.stringify(analytics));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <Badge variant="secondary">🔥 {streak} Day Streak</Badge>
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold">Your Results 🎯</h1>
        <p className="text-muted-foreground">
          Here’s how you performed in the quiz
        </p>
      </div>

      {/* Summary Card */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {correctAnswers} / {words.length} Correct
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          <div className="text-4xl font-bold">{percentage}%</div>

          <Badge variant={isPassed ? "default" : "destructive"}>
            {isPassed ? "Passed" : "Failed"}
          </Badge>
        </CardContent>
      </Card>

      {/* Answers Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Answer Review</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-2">
          {/* User Answers */}
          <div>
            <h3 className="mb-2 font-semibold">Your Answers</h3>
            <div className="space-y-1">
              {result.map((answer, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  {index + 1}. {answer}
                </p>
              ))}
            </div>
          </div>

          <Separator className="md:hidden" />

          {/* Correct Answers */}
          <div>
            <h3 className="mb-2 font-semibold">Correct Answers</h3>
            <div className="space-y-1">
              {words.map((word, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  {index + 1}. {word.meaning}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>Accuracy: {percentage}%</p>
          <p>Total Questions: {words.length}</p>
          <p>Correct Answers: {correctAnswers}</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-8 flex justify-center gap-4">
        <Button variant="outline" onClick={resetHandler}>
          Start Over
        </Button>
        <Button onClick={() => navigate("/learning")}>Learn Again</Button>
      </div>
    </div>
  );
};

export default Result;
