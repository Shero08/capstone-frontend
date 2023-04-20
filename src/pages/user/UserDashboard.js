import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import useSession from '../../hooks/useSession';
import DragAndDrop from '../../components/DragAndDrop';
import NewProjectModal from '../../components/NewProjectModal';

const UserDashboard = () => {
  const session = useSession();
  const userSession = session && session?.userSession
  const author = userSession?.id
  const [isOpenModalNewProject, setIsOpenModalNewProject] = useState(false);
  const [currentPage, setCurrentPage] = useState('UserDashboard');
  console.log(currentPage);

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
        <div className='mt-12 lg:mx-12'>
          <h1 className='text-center font-bold text-2xl'>
            Ciao {userSession?.name} {userSession?.surname}!
          </h1>

          <div className='w-full flex justify-center'>
            <button
              type='button'
              className='mx-auto bg-indigo-600 rounded-xl text-xl font-medium text-white py-3 px-8 mt-8 shadow-md hover:bg-indigo-400'
              onClick={openModalNewProject}
            >
              Nuovo Progetto
            </button>
          </div>
        </div>
      </main>

      <NewProjectModal 
        isOpenModalNewProject={isOpenModalNewProject}
        openModalNewProject={openModalNewProject}
        closeModalNewProject={closeModalNewProject}
        author={author}
        currentPage={currentPage}
      />
    </div>
  )
}

export default UserDashboard