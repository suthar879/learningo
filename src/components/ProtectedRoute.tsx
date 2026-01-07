import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { LearningState } from "../types/language";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const { words } = useSelector((state: { root: LearningState }) => state.root);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!words.length) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
