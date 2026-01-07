const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} LinguaFlow. All rights reserved.</p>

        <div className="flex gap-4">
          <span>Learn</span>
          <span>Quiz</span>
          <span>Progress</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
