import useFetch from "../hooks/useFetch";
import useInput from "../hooks/useInput";
//TODO: trova un modo pe rrendere fluido il cambio di dimensioni del div quando compare il link accorciato

export function UrlShortener() {
  const { value: url, onChange } = useInput("");
  const { data, loading, error, refetch } = useFetch(
    "https://localhost:3000/shorten",
    { lazy: true, method: "POST" }
  );
  const handleSubmit = () => {
    if (url.trim() === "") return;
    refetch({ body: JSON.stringify({ original_url: url }) });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-xl w-96">
      <p className="text-lg font-semibold text-white">URL Shortener</p>
      <input
        type="text"
        placeholder="https://example.com/your-long-url"
        onChange={onChange}
        value={url}
        className="transition-all duration-300 dark:bg-white/50 dark:text-black dark:placeholder-black/50 bg-transparent rounded-full border-0 text-gray-300 placeholder-white/50 w-full p-2"
      />
      <button
        className={` mt-4 w-full text-white py-2 rounded-lg text-lg ${
          url.trim() === ""
            ? "cursor-not-allowed bg-gray-500/50"
            : "cursor-pointer bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => handleSubmit()}
      >
        Accorcia link
      </button>
      {loading && <p>loading...</p>}
      {error && <p className="text-red-500">{error.message}</p>}
      {data && !error && <p>link corto: {data.short_url}</p>}
    </div>
  );
}
