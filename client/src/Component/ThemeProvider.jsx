import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white text-gray-700 dark:text-gray-200 dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
