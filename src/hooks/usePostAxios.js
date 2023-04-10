import { useState } from "react";
import axios from 'axios';
import HotToast from "../classes/hotToastClass";

const usePostAxios = ({ url, headers }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const post = async (postData) => {
    setLoading(true);

    try {
      await axios.post(url, postData, { headers })
      .then((res) => {
        setData(res.data);
        console.log(res.data.message);
        const toastPostSuccess = new HotToast(res.data.message);
        toastPostSuccess.postSuccess()
      })
      .finally(() => setLoading(false));
    } 
    catch (error) {
      const toast = new HotToast(error.response?.data.message);
      toast.postError()
      setError(true);
    }
  };
  
  return { data, loading, error, post };
};

export default usePostAxios;