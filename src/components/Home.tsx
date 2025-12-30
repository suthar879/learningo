import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const language = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "pt", name: "Portuguese" },
];

const Home = () => {
  const navigate = useNavigate();

  const languageSelectHandler = (code: string) => {
    navigate(`/learning?language=${code}`);
  };

  return (
    <div>
      <h1>Welcome, your language learning journey begins here!</h1>
      <p>Select a language to start learning:</p>
      <ul>
        {language.map((lang) => (
          <li key={lang.code}>
            <Button
              key={lang.code}
              onClick={() => languageSelectHandler(lang.code)}
            >
              {lang.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
