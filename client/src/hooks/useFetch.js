import { useState, useCallback, useEffect, useRef } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async (customOptions = {}) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchOptions = {
      ...options,
      ...customOptions,
      signal: controller.signal
    };

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, fetchOptions);
      if (!res.ok) {
        throw new Error("Errore: " + res.status);
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
    fetchData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
