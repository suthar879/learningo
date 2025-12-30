import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));
const Learning = lazy(() => import("./components/Learning"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/learning" element={<Learning />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
