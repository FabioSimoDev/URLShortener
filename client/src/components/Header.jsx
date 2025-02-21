import { Link } from "react-router";

export function Header() {
  return (
    <header className="absolute top-0 flex justify-between w-full px-8 py-5">
      <h1 className="text-xl font-bold">Link...</h1>
      <nav>
        <Link
          to="/about"
          className="text-lg font-medium dark:hover:bg-white/20 hover:bg-black/20 rounded-xl p-2"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
