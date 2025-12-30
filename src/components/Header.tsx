import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/60 backdrop-blur sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                L
              </div>
              <span className="font-semibold text-lg text-gray-900">
                Learningo
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                to="/learning"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Learning
              </Link>
              <Link
                to="/quiz"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Quiz
              </Link>
              <Link
                to="/result"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Results
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-gray-100 border border-transparent hover:border-gray-200 rounded-md px-2 py-1">
              <Search className="h-4 w-4 text-gray-600" />
              <input
                aria-label="Search"
                placeholder="Search courses, quizzes..."
                className="ml-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            <button className="hidden sm:inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              Get started
            </button>

            <button
              aria-label="Open user menu"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8z" />
                <path
                  fillRule="evenodd"
                  d="M.458 17.042A8 8 0 0116 16H4a4 4 0 01-3.542 1.042z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
