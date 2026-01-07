export const updateStreak = () => {
  const today = new Date().toDateString();

  const lastDate = localStorage.getItem("lastQuizDate");
  let streak = Number(localStorage.getItem("streak") || 0);

  if (lastDate !== today) {
    streak += 1;
    localStorage.setItem("streak", streak.toString());
    localStorage.setItem("lastQuizDate", today);
  }

  return streak;
};
