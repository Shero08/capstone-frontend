import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import useAxios from '../../hooks/useAxios';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';

const ProjectList = () => {
  const [isOpenModalNewProject, setIsOpenModalNewProject] = useState(false);
    const openModalNewProject = () => {
        setIsOpenModalNewProject(true)
      }
    
      const closeModalNewProject = () => {
        setIsOpenModalNewProject(false)
      }
    

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
        </main>
    </div>
  )
}

export default ProjectList