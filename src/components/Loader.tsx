import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      {/* Spinner */}
      <Loader2 className="h-10 w-10 animate-spin text-primary" />

      {/* Text */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          Loading your lesson…
        </p>
        <p className="text-xs text-muted-foreground">
          Preparing words & quizzes
        </p>
      </div>
    </div>
  );
};

export default Loader;
