import {useEffect, useState} from "react";
import useAxios from '../hooks/useAxios';
import useSession from "../hooks/useSession";

const UserAvatar = () => {
  const [src, setSrc] = useState("");
  const session = useSession();

  const submit = async (e)=>{
    e.preventDefault();
        
    let data = new FormData();
    data.append('avatar', e.target[0].files[0]) //il primo parametro è il name che useremo nel metodo single di multer

    let res = await fetch(`${process.env.REACT_APP_API_URL}/avatar`, {
      method: 'POST',
      body: data
    }).then(res=>res.json())
      console.log("RESPONSE", res);
      setSrc(res.fileName); //aggiungere dati al backend
  }

  const id = session?.id

  const { data, loading, getError } = useAxios({ url: `${process.env.REACT_APP_API_URL}/users/${id}`, headers: {}});
    
  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <>
    <div className="px-6 py-5 text-md text-gray-500">Foto profilo</div>

    <div className="px-6 pb-6">
      <img alt='avatar' className="w-40 text-gray-300 rounded-full mx-auto" src={data?.avatar} /> 
    </div>

    <form 
      className="px-6 pb-6"
      onSubmit={submit} 
      encType="multipart/form-data"
    >
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Carica una nuova foto profilo:
        </label>
        <input 
          type="file" 
          name="uploadImage" 
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <button 
          type="submit"
        >
          Carica
        </button>
    </form>
    </>
  )
}

export default UserAvatar