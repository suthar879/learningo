import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [answers, setAnswers] = useState<string>("");
  const navigate = useNavigate();

  const nextHandler = (): void => {
    setResult((prev) => [...prev, answers]);
    setCount((prev) => prev + 1);
    setAnswers("");
  };

  return (
    <div>
      <p>Quiz</p>
      <h3>
        {count + 1} - {"Randoms"}
      </h3>
      <form>
        <label> Meaning</label>
        <input
          type="radio"
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
        />
      </form>
      <Button onClick={nextHandler} disabled={answers === ""}>
        {count === 9 ? "Submit" : "Next"}
      </Button>
    </div>
  );
};

export default Quiz;
