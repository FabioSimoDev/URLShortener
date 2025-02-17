export function UrlShortener() {
  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-xl w-96">
      <p className="text-lg font-semibold text-white">URL Shortener</p>
      <input
        type="text"
        value={""}
        placeholder="https://example.com/your-long-url"
        className="transition-all duration-300 dark:bg-white/50 dark:text-black dark:placeholder-black/50 bg-transparent rounded-full border-0 text-gray-300 placeholder-white/50 w-full p-2"
      />
      <button className=" mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-lg">
        Accorcia link
      </button>
    </div>
  );
}
