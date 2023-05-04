import { useEffect, useState } from "react";
import useAxios from '../hooks/useAxios';
import usePatchAvatar from "../hooks/usePatchAvatar";
import useSession from "../hooks/useSession";
import LoadingIndicator from '../components/LoadingIndicator';

const UserAvatar = () => {
  const [src, setSrc] = useState('');
  const session = useSession();
  const userSession = session && session?.userSession
  const userToken = session && session?.userToken

  const id = userSession?.id

  const { data, loading, error } = useAxios({ url: `${process.env.REACT_APP_API_URL}/users/${id}`, headers: {}});

  const { patchData, patchError, patch } = usePatchAvatar({ url: `${process.env.REACT_APP_API_URL}/users/${id}/avatar`, headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": userToken
  }}); 

  const handleUpload = (e) => {
    e.preventDefault();  
        
    const uploadData = new FormData();
    uploadData.append('avatar', e.target[0].files[0])
     
    patch(uploadData).then(() => {
      console.log(patchData);


    setTimeout(() => {
      window.location.reload(); 
    }, 1000)
    });

    setSrc(patchData.fileName);
    console.log(src); 

    if(patchError){
      console.log(patchError)
    }  
  }
     
  useEffect(() => { 
    console.log(data);
    console.log(patchData);
  }, [data, patchData, src])

  return (
    <>
    <div className="px-6 py-5 text-md text-gray-500">Foto profilo</div>

    <div className="px-6 pb-6">
      {!loading && error && (
        <div className="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{error}</div>
      )}
      {loading && <LoadingIndicator />}
      {!loading && data &&
        <div className="w-40 h-40 rounded-full mx-auto overflow-hidden shadow-xl">
          <img alt='avatar' className=" text-gray-300 w-full object-cover" src={data.avatar} /> 
        </div>
      }
    </div>

    <form 
      className="px-6 pb-6"
      onSubmit={handleUpload} 
      encType="multipart/form-data"
    >
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Carica una nuova foto profilo:
        </label>
        <input
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
          type="file"
          id="formFile" 
        />

        <button 
          type="submit"
          className="rounded-md mt-3 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Carica
        </button>
    </form>
    </>
  )
}

export default UserAvatar