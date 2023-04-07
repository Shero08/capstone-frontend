import { useState } from "react";
import axios from 'axios';
import HotToast from "../classes/hotToastClass";

const useDeleteAxios = ({ url, headers }) => {
    const [error, setError] = useState(false); 

    const toast = new HotToast();
    const toastDeleteSuccess = new HotToast("Hai eliminato l'utente con successo");

    const deleteData = async () => {
        try {
            await axios.delete(url, { headers })
                .then(() => {
                    toastDeleteSuccess.deleteSuccess()
                })
        } 
        catch (error) {
            setError(true);
        }
    }

  return { deleteData, error };
};

export default useDeleteAxios