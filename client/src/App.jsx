import { useState } from "react";
import { Header } from "./components/Header";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { UrlShortener } from "./components/UrlShortener";
// import { useGridAnimation } from "./hooks/useGridAnimation";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  // const gridPosition = useGridAnimation();
  return (
    <div
      className={`transition-all duration-300 relative dark:bg-[#0a0f1a] dark:text-white bg-gray-100 text-black min-h-screen flex flex-col items-center justify-center ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: darkMode
            ? "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)"
            : "linear-gradient(rgba(0, 0, 0, 0.5) 2px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.5) 2px, transparent 1px)",
          backgroundSize: "80px 80px",
          // backgroundPosition: `${gridPosition}px ${gridPosition}px`,
          transition: "background-position 100ms linear"
        }}
      />
      <Header />
      <main className="flex flex-col items-center text-center space-y-6 relative z-10">
        <h2 className="text-5xl font-bold">
          Transform Your <span className="text-blue-400">Links</span> in a Click
        </h2>
        <DarkModeToggle
          darkMode={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
        />
        <UrlShortener />
      </main>
    </div>
  );
}

export default App;
