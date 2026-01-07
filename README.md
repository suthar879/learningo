🚀 LinguaFlow — Learn & Quiz Languages

> A lightweight React + TypeScript app (Vite) to learn words, review meanings, and take quick quizzes.

✨ Built for fast learning sessions with an approachable UI, progress tracking, and quiz results saved to Redux.

---

## 🧭 App Flow (Code + UX)

- Home → Learning → Quiz → Results
- The core data flow:
  - `translateWords()` (in `src/utils/features.ts`) fetches/translates the word list and dispatches `getWordsSuccess`.
  - Words are stored in Redux under the `root` slice (`src/redux/slices.ts`) as `state.root.words`.
  - `Learning` (`src/components/Learning.tsx`) renders flashcards and navigates to `/quiz`.
  - `Quiz` (`src/components/Quiz.tsx`) reads `words` from Redux and records chosen answers into `state.root.result` via the `saveResult` action.
  - `Result` (`src/components/Result.tsx`) reads `result` and `words` to calculate score and show feedback.

---

## 🧩 Key Files & Where To Look

- **Pages / Components**
  - `src/components/Learning.tsx` — learning flashcards and starting the quiz
  - `src/components/Quiz.tsx` — quiz UI, choices, progress, submit
  - `src/components/Result.tsx` — results screen and score
  - `src/components/Home.tsx` — landing and navigation
- **State / Store**
  - `src/redux/slices.ts` — Redux slice (`getWordsRequest`, `getWordsSuccess`, `saveResult`, `clearState`)
  - `src/redux/store.ts` — store configuration
- **Utilities**
  - `src/utils/features.ts` — translation / data generation logic

---

## ✨ Features

- Progressive learning cards with next/back controls
- Start a quiz based on learned words
- Multiple-choice options generated per word
- Progress bar and per-question progress count
- Results saved to Redux and viewable in `Result` page

---

## 🧰 Tech Stack

- React + TypeScript
- Vite (dev server + build)
- Redux Toolkit for state management
- Tailwind CSS + component UI primitives

---

## ⚙️ Run Locally

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## 🛠 Development Notes

- If `Quiz` shows "No quiz data found" make sure you navigate from `Learning` after words are loaded — the app expects the translated `words` to be present in Redux. If needed, avoid dispatching `clearState()` on unmount of `Learning` so the quiz can access words after navigation.
- Words shape (see `src/redux/slices.ts`):

```ts
type wordType = {
  word: string;
  meaning: string;
  options: string[];
};
```

- Results are stored as `string[]` (selected options) in `state.root.result`.

---

## ✅ Tips & Troubleshooting

- Browser Console: use console logs in `Quiz.tsx` to inspect `words` and ensure they are non-empty.
- If navigating directly to `/quiz` without visiting `Learning`, the app may have no words — either seed words on app startup or persist state between routes.
- To reset the app state, call `clearState()` (e.g., on logout) which clears `words` and `result`.

---

## ❤️ Contributing

PRs welcome — open an issue or submit a PR for bugs, feature requests, or documentation improvements.

---

Made with ❤️ and lots of coffee ☕ — happy learning! 🎧📚🧠
