import { useState } from "react";
import axios from 'axios';

const usePostAxios = ({ url, headers }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const post = async (postData) => {
    setLoading(true);
    await axios.post(url, postData, { headers })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false)); 
  };
  
  return { data, loading, error, post };
};

export default usePostAxios;