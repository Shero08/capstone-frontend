import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import useAxios from '../../hooks/useAxios';
import LoadingIndicator from '../../components/LoadingIndicator'
import SingleFile from '../../components/SingleFile';
import useSession from '../../hooks/useSession';
import CancelProjectModal from '../../components/CancelProjectModal';
import UpdateProjectModal from '../../components/UpdateProjectModal';
import AcceptProjectModal from '../../components/AcceptProjectModal';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';


const SingleProject = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const session = useSession();
  const userSession = session && session?.userSession
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
  const [statusClass, setStatusClass] = useState('');

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

  const openUpdateProjectModal = () => {
    setIsOpenUpdate(true)
  }

  const closeUpdateProjectModal = () => {
    setIsOpenUpdate(false)
  }

  const openAcceptProjectModal = () => {
    setIsOpenAcceptModal(true)
  }

  const closeAcceptProjectModal = () => {
    setIsOpenAcceptModal(false)
  }

  useEffect(() => {
    if (data.status === "in attesa") {
      setStatusClass("text-gray-600 bg-gray-300");
    } else if (data.status === "completo") {
      setStatusClass("text-white bg-green-600");
    } else if (data.status === "in lavorazione") {
      setStatusClass("text-black bg-orange-600"); 
    } else {
      setStatusClass("text-white bg-red-600");
    }
    console.log(userSession);
  }, [data]);

  return (
    <div className='flex bg-capstone-bg w-full'>
      <Sidebar />

      <main className='flex-1 ml-20 lg:ml-0'>
        <div className='mt-12 lg:mx-12'>

          {loading && <LoadingIndicator />}
          {!loading && error && navigate("/login")}
          {!loading && data &&
            <div>
                <div className='title flex justify-between items-center '>
                    <div className='font-bold text-2xl'>
                      <h1>{data.title}</h1>
                      <p className="font-normal mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Data di creazione: {formattedDate}
                      </p>
                    </div>


                    <div className={`px-6 py-2 text-xl rounded-full ${statusClass}`}>
                        {data.status}
                    </div>
                </div>

                <div className='py-6 px-6 mt-6 rounded-xl bg-white shadow'>
                    <div className='flex items-center justify-between border-b border-b-gray-200 pb-2 mb-2'>
                        {data && data.author && 
                            <h2 className='pb-2 text-md'>
                                Creato da: {data.author.name} {data.author.surname}
                             </h2>
                        }

                        {data && data.editor &&
                          <h2 className='pb-2 text-md'>
                            Preso in carico da: {data.editor.name} {data.editor.surname}
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
                                status={data.status}
                              />
                            </div>
                        </div>
                    </div>        
                    <div className='border-t border-t-gray-200 italic mt-2'>
                        <p className='mt-2'>
                          Servizio richiesto: {data && data.category && data.category.map((service, index) => (
                            <span 
                              key={index}
                              className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600 mx-1'
                            >
                              {service}
                            </span>
                        ))}</p>
                    </div>       
                    
                </div>

                <div className='flex justify-between mt-3'>
                  <div>
                    <button 
                      type='button'
                      as={Link}
                      onClick={() => {navigate(-1)}}
                      className='flex items-center gap-x-3 bg-white hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-xl duration-200 shadow'
                    >
                      <ArrowLeftIcon className='w-4' />
                      Torna alla lista lavori
                    </button>
                  </div>

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

                    {userSession?.role === 'admin' ?
                        <button
                          type='button'
                          onClick={openUpdateProjectModal}
                          className='bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl'
                        >
                          Modifica
                        </button>
                      : ''}

                    {userSession?.role === 'admin' && data.status === 'in attesa' ?
                        <button
                          type='button'
                          onClick={openAcceptProjectModal}
                          className='bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-xl'
                        >
                          Accetta
                        </button>
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

        <UpdateProjectModal 
          isOpenUpdate={isOpenUpdate}
          openUpdateProjectModal={openUpdateProjectModal}
          closeUpdateProjectModal={closeUpdateProjectModal}
          title={data.title}
          description={data.description}
          category={data.category}
          status={data.status}
          id={_id}
          isRefresh={isRefresh}
        />

        <AcceptProjectModal 
          isOpenAcceptModal={isOpenAcceptModal}
          openAcceptProjectModal={openAcceptProjectModal}
          closeAcceptProjectModal={closeAcceptProjectModal}
          title={data.title}
          id={_id}
          editor={userSession?.id}
          isRefresh={isRefresh}
        />
      </main>
    </div>
  )
}

export default SingleProject