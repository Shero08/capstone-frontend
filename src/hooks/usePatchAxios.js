import { useState } from "react";
import axios from 'axios';
import HotToast from "../classes/hotToastClass";

const usePatchAxios = ({ url, headers }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); 
    
    const toast = new HotToast();
    const toastUpdateSuccess = new HotToast('Modifica avvenuta con successo.');

    const patch = async (patchData) => {
        setLoading(true);
        await axios.patch(url, patchData, { headers })
          .then((res) => {
            setData(res.data);
            toastUpdateSuccess.updateSuccess() 
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