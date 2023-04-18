import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FolderArrowDownIcon } from '@heroicons/react/24/outline';

const SingleFile = ({fileName, id, status}) => {
const [cancelStatus, setCancelStatus] = useState(false)

useEffect(() => {
  if(status === 'annullato'){
    setCancelStatus(true)
  }
}, [status])
    

    const downloadFile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${id}/${fileName}`, { responseType: 'blob' });

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

      } 
      catch (error) {
        console.error(error);
      }
    };
    
    return (
        <div className='text-center'>
          <button
            disabled={cancelStatus}
            className='' 
            onClick={() => downloadFile()}
          >
            <FolderArrowDownIcon className='w-14 text-center mx-auto p-2 rounded-xl hover:bg-gray-300 duration-150' />
          </button>
          <p className='font-normal text-sm'>{fileName}</p>
        </div>
      );
}

export default SingleFile