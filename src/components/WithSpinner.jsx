import { useState, useEffect } from "react";
import Spinner from "./spinner";

const WithSpinner = ({ children, delay = 3000 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return loading ? <Spinner /> : children;
};

export default WithSpinner;
