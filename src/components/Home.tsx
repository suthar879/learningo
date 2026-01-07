import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Languages } from "lucide-react";

const languages = [
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
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="mb-10 text-center space-y-3">
        <div className="flex justify-center">
          <Languages className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Start Your Language Learning Journey
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Choose a language, learn new words, and test your knowledge with fun
          quizzes.
        </p>
      </div>

      {/* Language Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {languages.map((lang) => (
          <Card
            key={lang.code}
            className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            onClick={() => languageSelectHandler(lang.code)}
          >
            <CardContent className="flex items-center justify-between p-3">
              <span className="text-base font-medium">{lang.name}</span>

              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Start →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
