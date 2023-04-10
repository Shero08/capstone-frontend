import { useState, useEffect } from "react";
import axios from 'axios';

const useAxios = ({ url, headers }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      await axios.get(url, { headers })
        .then((res) => {
          setData(res.data);
        })
        .finally(() => setLoading(false)); 
    } 
    catch (error) {
      setError(true);
    }
  }
  
  useEffect(() => { 
    setLoading(true);
    getData();
  }, [url]);
  
  return { data, loading, error};
};

export default useAxios;