import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav className="border-b px-4 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>Ramadhan Tracker</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </nav>
  );
}
