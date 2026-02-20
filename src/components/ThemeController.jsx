import React from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../features/themeSlice";

function ThemeController() {
  const darkMode = useSelector(selectDarkMode);

  // set dark/light in html element & save it in localStorage
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode === "dark");
    // persist to localStorage
    localStorage.setItem("redux-theme", darkMode);
  }, [darkMode]);
  return null;
}

export default ThemeController;
