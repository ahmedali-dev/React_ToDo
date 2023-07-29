import axios from "./axios";
import { useState, useEffect } from "react";

const useFetch = (method, path, body) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  useEffect(() => {
    return async () => {
      setloading(true);
      try {
        const req = await axios[method](`/${path}`, ...body);
        setdata(await req.data);
      } catch (err) {
        seterror(await err.response.data);
      }
      setloading(false);
    };
  }, []);

  return { data, error, loading };
};

const FetchD = async (container, method, path, body) => {
  try {
    const req = await axios[method](`/${path}`, ...body);
    return container({ data: req.data });
  } catch (err) {
    console.log(err);
    container({ error: err.response });
    throw err;
  }
};

export { FetchD };
export default useFetch;
