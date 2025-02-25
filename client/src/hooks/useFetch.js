import { useState, useCallback, useEffect, useRef } from "react";

const useFetch = (url, options = {}) => {
  const { lazy = false, ...fetchOptions } = options;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!lazy);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async (customOptions = {}) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const combinedOptions = {
      ...fetchOptions,
      ...customOptions,
      signal: controller.signal
    };

    setLoading(true);
    setError(null);

    try {
      console.log(combinedOptions);
      const res = await fetch(url, combinedOptions);
      if (!res.ok) {
        const errorPayload = await res.json();
        throw new Error(errorPayload.message || "Qualcosa è andato storto...");
      }
      const json = await res.json();
      setData(json);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!lazy) fetchData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, lazy]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
