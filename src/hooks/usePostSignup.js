import { useState } from "react";
import axios from 'axios';
import HotToast from "../classes/hotToastClass";
import {useNavigate} from 'react-router-dom';

const usePostSignup = ({ url, headers }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const toastErrorNickname = new HotToast('Errore, esiste già un utente con questo nickname');
  const toastErrorEmail = new HotToast('Errore, esiste già un utente con questa email');
  const toast = new HotToast();
  
  const post = async (postData) => {
    setLoading(true);
    await axios.post(url, postData, { headers })
      .then((res) => {
        setData(res.data);
        toast.signupConfirm()

        setTimeout(() => {
            navigate('/login')
        }, 5000)
      })
      .catch((err) => {
        if(err.response.data.error === 'mail'){
            toastErrorEmail.signupErrorMail()
        } else if(err.response.data.error === 'nick') {
            toastErrorNickname.signupErrorNickname()
        } else {
            toast.signupError()
        }
        
        setError(true);
      })
      .finally(() => setLoading(false)); 
  };
  
  return { data, loading, error, post };
};

export default usePostSignup;