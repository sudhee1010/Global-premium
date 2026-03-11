import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <Sun className="size-5 text-gray-700 dark:text-gray-300 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <Moon className="absolute size-5 text-gray-700 dark:text-gray-300 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

