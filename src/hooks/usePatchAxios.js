import { useState } from "react";
import axios from 'axios';
import HotToast from "../classes/hotToastClass";
import {useNavigate} from 'react-router-dom';

const usePatchAxios = ({ url, headers }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); 
    
    const toast = new HotToast();

    const patch = async (patchData) => {
        setLoading(true);
        await axios.patch(url, patchData, { headers })
          .then((res) => {
            setData(res.data);
            toast.signupConfirm()
    
            setTimeout(() => {
                navigate('/login')
            }, 5000)
          })
          .catch((err) => {
            toast.signupError()
            
            setError(true);
          })
          .finally(() => setLoading(false)); 
    };

  return { data, loading, error, patch };
};

export default usePatchAxios