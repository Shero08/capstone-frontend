import { useState, useEffect } from "react";
import axios from 'axios';

const useAxios = ({ url, headers }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios.get(url, { headers })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false)); 
  }, [url]);
  
  return { data, loading, error};
};

export default useAxios;