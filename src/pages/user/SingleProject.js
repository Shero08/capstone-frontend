import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import useAxios from '../../hooks/useAxios';
import LoadingIndicator from '../../components/LoadingIndicator'
import SingleFile from '../../components/SingleFile';
import useSession from '../../hooks/useSession';
import CancelProjectModal from '../../components/CancelProjectModal';

const SingleProject = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const session = useSession()
  const [isOpenCancel, setIsOpenCancel] = useState(false);

  const { data, loading, error, isRefresh } = useAxios({ url: `${process.env.REACT_APP_API_URL}/projects/${_id}`, headers: {}});

  const date = new Date(data.createdAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('it-IT', options);
  const fileName = data && data.file && data.file.filename

  const openCancelModal = () => {
    setIsOpenCancel(true)
  }

  const closeCancelModal = () => {
    setIsOpenCancel(false)
  }

  return (
    <div className='flex bg-capstone-bg w-full'>
      <Sidebar />

      <main className='flex-1 ml-20 lg:ml-0'>
        <div className='mt-12 lg:mx-12'>

          {loading && <LoadingIndicator />}
          {!loading && error && navigate("/404")}
          {!loading && data &&
            <div>
                <div className='title flex justify-between items-center '>
                    <div className='font-bold text-2xl'>
                      <h1>{data.title}</h1>
                      <p className="font-normal mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Data di creazione: {formattedDate}
                      </p>
                    </div>

                    <div className="px-6 py-2 text-xl text-white bg-blue-300 rounded-full dark:bg-gray-800 dark:text-blue-400">
                        {data.status}
                    </div>
                </div>

                <div className='py-6 px-6 mt-6 rounded-xl bg-white shadow'>
                    <div>
                        {data && data.author && 
                            <h2 className='pb-2 mb-4 text-md border-b border-b-gray-200'>
                                Inserito da: {data.author.name} {data.author.surname}
                             </h2>
                        }
                    </div>
                    <div className='group flex justify-between items-center'>
                        <div>
                            <h1 className='font-bold text-xl'>{data.title}</h1>
                            <h2 className='mb-10'>{data.description}</h2>
                        </div>

                        <div>
                            <div>
                              <SingleFile 
                                fileName={fileName}
                                id={_id}
                              />
                            </div>
                        </div>
                    </div>        
                    <div className='border-t border-t-gray-200 italic'>
                        <p>Servizio richiesto: {data && data.category && data.category.map((service, index) => (
                            <span 
                              key={index}
                              className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600 mx-1'
                            >
                              {service}
                            </span>
                        ))}</p>
                    </div>       
                    
                </div>

                <div className='flex justify-end mt-3'>
                  <div className='flex items-center gap-4'>
                    {data.status !== 'completo' && data.status !== 'annullato' ?
                    <button
                      type='button'
                      onClick={openCancelModal}
                      className='bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-xl'
                    >
                      Annulla progetto
                    </button>
                    : ''}

                    {session?.role === 'admin' ?
                      <div className='flex gap-4'>
                        <button
                          type='button'
                          className='bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl'
                        >
                          Modifica
                        </button>
                        <button
                          type='button'
                          className='bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-xl'
                        >
                          Accetta
                        </button>
                      </div>
                    : ''}
                  </div>
                </div>
            </div>
          }

        </div>

        <CancelProjectModal 
          isOpenCancel={isOpenCancel}
          openCancelModal={openCancelModal}
          closeCancelModal={closeCancelModal}
          title={data.title}
          id={_id}
          isRefresh={isRefresh}
        />
      </main>
    </div>
  )
}

export default SingleProject