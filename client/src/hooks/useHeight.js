import { useEffect, useRef, useState } from "react";

const useHeight = (dependency) => {
  const resultRef = useRef(null);
  const [resultHeight, setResultHeight] = useState(0);

  useEffect(() => {
    if (resultRef.current) {
      setResultHeight(resultRef.current.scrollHeight);
    } else {
      setResultHeight(0);
    }
  }, [dependency]);

  return { resultRef, resultHeight };
};

export default useHeight;
