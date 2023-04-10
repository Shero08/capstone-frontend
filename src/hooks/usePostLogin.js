import { useState } from "react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom';
import HotToast from "../classes/hotToastClass";

const usePostLogin = ({ url, headers }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  
  
  const post = async (postData) => {
    setLoading(true);
    try {
      await axios.post(url, postData, { headers })
      .then((res) => {
        const token = res.data?.token

        if(token){
          setData(res.data);
          const decoded = jwt_decode(token)
          localStorage.setItem('token', JSON.stringify(decoded))

          decoded.role === 'admin' 
          ? navigate('/admin', { replace: true })
          : navigate('/dashboard', { replace: true })
        }
      })
      .finally(() => setLoading(false));
    } 
    catch (error) {
      const toast = new HotToast(error.request.response);
      toast.loginError()
      setError(true);
    } 
  };
  
  return { data, loading, error, post };
};

export default usePostLogin;