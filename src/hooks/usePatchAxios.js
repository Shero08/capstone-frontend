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

        try {
          await axios.patch(url, patchData, { headers })
          .then((res) => {
            setData(res.data);
            toastUpdateSuccess.updateSuccess() 
          })
          .finally(() => setLoading(false));
        }  
        catch (error) {
          toast.signupError()

          setError(true);
        }
    };

  return { data, loading, error, patch };
};

export default usePatchAxios