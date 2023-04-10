import { useState } from "react";
import axios from 'axios';
import HotToast from "../classes/hotToastClass";

const usePatchAvatar = ({ url, headers }) => {
  const [patchData, setPatchData] = useState([]);
  const [patchLoading, setPatchLoading] = useState(false);
  const [patchError, setPatchError] = useState(false);

  const toastPostSuccess = new HotToast('Nuovo inserimento avvenuto con successo.');
  
  const patch = async (formData) => {
    setPatchLoading(true);
    await axios.patch(url, formData, { headers }) 
      .then((res) => {
        setPatchData(res.data);
        toastPostSuccess.postSuccess()
      })
      .catch(() => {
        setPatchError(true);
      })
      .finally(() => setPatchLoading(false)); 
  };
  
  return { patchData, patchLoading, patchError, patch };
};

export default usePatchAvatar;