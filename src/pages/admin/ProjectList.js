import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import useAxios from '../../hooks/useAxios';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import SingleProjectRow from '../../components/SingleProjectRow';
import Pagination from '../../components/Pagination';
import LoadingIndicator from '../../components/LoadingIndicator';

const ProjectList = () => {
  const [isOpenModalNewProject, setIsOpenModalNewProject] = useState(false);
  const [totPages, setTotPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, loading, error, isRefresh } = useAxios({ url: `${process.env.REACT_APP_API_URL}/projects?page=${currentPage}&limit=${limit}`, headers: {}});

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const openModalNewProject = () => {
    setIsOpenModalNewProject(true)
  }
    
  const closeModalNewProject = () => {
    setIsOpenModalNewProject(false)
  }

  useEffect(() => {
    if(data){
        setTotPages(data.totalPages)
    }

    console.log(data);
  }, [data])

  return (
    <div className='flex bg-capstone-bg w-full'>
        <Sidebar />

        <main className='flex-1 ml-20 lg:ml-0'>
            <div className='head flex justify-between items-center my-8 mx-6 px-2'>
                <div className='title font-bold text-xl'>
                    <h1>Lista dei lavori presenti sul portale:</h1>
                </div>
                <div className='rounded-md bg-indigo-600 text-xl px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-400'>
                    <button
                        type='button'
                        onClick={openModalNewProject}
                        className='flex items-center gap-x-2'
                    >
                        <DocumentPlusIcon className='w-6' />
                        Nuovo progetto
                    </button>
                </div>
            </div>

            {!loading && error && (
                <div className="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{error}</div>
            )}
            {loading && <div className='mx-auto'><LoadingIndicator /></div>}
            
            <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-6'>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Titolo</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Stato</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Autore</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Servizio</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {!loading && data && data.projects && data.projects.map((project) => (
                        <SingleProjectRow 
                            key={project._id}
                            {...project}
                            isRefresh={isRefresh}
                        />
                        ))}

                        <tr className='border-none'>
                            <td colSpan={5} className='w-full'>
                                <Pagination
                                    handlePrevClick={handlePrevClick}
                                    handleNextClick={handleNextClick}
                                    totPages={totPages}
                                    currentPage={currentPage}
                                    totalDocuments={data.totalDocuments}
                                />
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>

        </main>
    </div>
  )
}

export default ProjectList