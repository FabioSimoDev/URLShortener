import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextFile";
import useFetch from "../hooks/useFetch";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { UrlShortener } from "../components/UrlShortener";
import Board from "../components/Board";

const Home = () => {
  const { data, loading, error, refetch } = useFetch(
    "https://localhost:3000/top",
    { lazy: false }
  );
  const { isDarkMode: darkMode, toggleTheme: setDarkMode } =
    useContext(ThemeContext);

  return (
    <div className="flex justify-evenly w-full px-10">
      <main className="flex flex-col flex-1 items-center text-center space-y-6 relative z-10">
        <h2 className="text-5xl font-bold">
          Transform Your <span className="text-blue-400">Links</span> in a Click
        </h2>
        <DarkModeToggle
          darkMode={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
        />
        <UrlShortener />
        <button className="p-3 bg-white text-black" onClick={() => refetch()}>
          refresh test
        </button>
      </main>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <Board list={data} />}
    </div>
  );
};

export default Home;
