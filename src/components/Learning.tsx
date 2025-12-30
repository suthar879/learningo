import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { MoveLeft, Volume } from "lucide-react";

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

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const params = useSearchParams()[0].get("language") as LanguageType;
  const navigate = useNavigate();

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
  };

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
          {count + 1} - {"sample"}
        </h4>{" "}
        :<h4 className="text-blue-500"> {"Lol"}</h4>
        <Button>
          <Volume className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
      <Button onClick={count === 9 ? () => navigate("/quiz") : nextHandler}>
        {count === 9 ? "Text" : "Next"}
      </Button>
    </div>
  );
};

export default Learning;
