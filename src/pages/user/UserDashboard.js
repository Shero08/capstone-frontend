import React from 'react';
import Sidebar from '../../components/Sidebar';
import useSession from '../../hooks/useSession';
import DragAndDrop from '../../components/DragAndDrop';

const UserDashboard = () => {
  const session = useSession();

  return (
    <div className='flex bg-capstone-bg w-full'>
      <Sidebar />

      <main className='flex-1 ml-20 lg:ml-0'>
        <div className='mt-12 lg:mx-12'>
          <h1 className='text-center'>Ciao {session?.name} {session?.surname}</h1>

          <DragAndDrop />
        </div>
      </main>
    </div>
  )
}

export default UserDashboard