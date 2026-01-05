import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { saveResult } from "../redux/slices";

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

const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [answers, setAnswers] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { words, loading, error } = useSelector(
    (state: { root: stateType }) => state.root
  );

  const nextHandler = (): void => {
    setResult((prev) => [...prev, answers]);
    setCount((prev) => prev + 1);
    setAnswers("");
  };

  useEffect(() => {
    if (count + 1 > words.length) {
      navigate("/result");
    }

    dispatch(saveResult(result));
  }, [result]);

  return (
    <div>
      <p>Quiz</p>
      <h3>
        {count + 1} - {words[count]?.word}
      </h3>
      <form>
        <label> Meaning</label>
        {words[count]?.options.map((i) => (
          <>
            <label htmlFor={i}></label>
            <input
              type="radio"
              value={i}
              name={i}
              onChange={(e) => setAnswers(e.target.value)}
            />
          </>
        ))}
      </form>
      <Button onClick={nextHandler} disabled={answers === ""}>
        {count === words.length - 1 ? "Submit" : "Next"}
      </Button>
    </div>
  );
};

export default Quiz;
