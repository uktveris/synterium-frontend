import useTheme from "../hooks/useTheme";
import styles from "./header.module.css";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.toggleThemeButton} onClick={toggleTheme}>
      {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </button>
  );
}

export { ToggleThemeButton };
