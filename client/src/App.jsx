import { useContext } from "react";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeContext } from "./contexts/ThemeContextFile";
import { Header } from "./components/Header";

function App() {
  const { isDarkMode: darkMode } = useContext(ThemeContext);
  return (
    <BrowserRouter>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
