import React from 'react';
import Sidebar from '../../components/Sidebar';
import UserInfo from '../../components/UserInfo';
import UserAvatar from '../../components/UserAvatar';

const Profile = () => {
  return (
    <div className='flex bg-capstone-bg w-full'> 
        <Sidebar />

        <main className='flex-1 ml-20 lg:ml-0'>
            <div className='head flex justify-between items-center my-8 mx-3 lg:mx-6 px-2'>
                <div className='title font-bold text-xl'>
                    <h1>Pagina profilo utente:</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8 mx-5 lg:mx-8 lg:grid-cols-2">
              <div className="w-full bg-white border-collapse rounded-lg shadow">
                <UserInfo />
              </div>

              <div className="w-full bg-white border-collapse rounded-lg shadow">
                <UserAvatar />
              </div>
            </div>
        </main>
    </div>
  )
}

export default Profile