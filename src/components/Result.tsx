import { mean } from "lodash";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../redux/slices";
import { useNavigate } from "react-router-dom";
import { countMatchedAnswers } from "../utils/features";

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

const Result = () => {
  const { words, result } = useSelector(
    (state: { root: stateType }) => state.root
  );
  const correctAnswers = countMatchedAnswers(
    result,
    words.map((i) => i.meaning)
  );
  const percentage = (correctAnswers / words.length) * 100;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetHandler = (): void => {
    dispatch(clearState());
    navigate("/");
  };

  return (
    <div>
      <h3>Result</h3>
      <h6>
        You got {correctAnswers} out of {words.length} correct.
      </h6>
      <h6>Percentage: {percentage}%</h6>

      <div>
        <div>
          <h5>Your answer</h5>
          {result.map((i, index) => (
            <p key={index}>
              {index + 1} -{i}
            </p>
          ))}
        </div>
        <div>
          <h5>Correct answer</h5>
          {words.map((i, index) => (
            <p key={index}>
              {index + 1} - {words[index].meaning}
            </p>
          ))}
        </div>
      </div>
      <h5>{percentage > 50 ? "Pass" : "Fail"}</h5>
      <Button onClick={resetHandler}>Reset</Button>
    </div>
  );
};

export default Result;
