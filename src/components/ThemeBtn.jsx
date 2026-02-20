import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, toggleTheme } from "../features/themeSlice";

function ThemeBtn() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg bg-(--color-bg-subtle) text-(--color-text-main) hover:bg-(--color-bg-subtle-hover) transition-colors cursor-pointer"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeBtn;
