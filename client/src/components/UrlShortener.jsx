import useFetch from "../hooks/useFetch";
import useInput from "../hooks/useInput";
import useHeight from "../hooks/useHeight";
import TextArea from "./TextArea";
//TODO: aggiungi la funzionalità di copia del link accorciato
//TODO: per ora il link localhost:3000 è hardcoded, cambialo in una variabile d'ambiente
//TODO: probabilmente è meglio usare un tag <form> per il form, in modo da poter usare il tasto invio per accorciare il link
//TODO: aggiungi un'animazione al bottone di copia

export function UrlShortener() {
  const { value: url, onChange } = useInput("");
  const { data, loading, error, refetch } = useFetch(
    "https://localhost:3000/shorten",
    { lazy: true, method: "POST" }
  );
  const { resultRef, resultHeight } = useHeight(data);

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
      <div
        style={{ height: data ? resultHeight : 0 }}
        className={`transition-all duration-600 ease-out overflow-hidden ${
          data && "mt-4"
        }`}
      >
        {data && !error && (
          <TextArea
            result={`https://localhost:3000/${data.short_url}`}
            resultRef={resultRef}
          />
        )}
      </div>
    </div>
  );
}
