import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/Sidebar';
import SingleUserRow from '../../components/SingleUserRow';
import useAxios from '../../hooks/useAxios';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import NewUserModal from '../../components/NewUserModal';

const UserList = () => {
  const [isOpenModalNewUser, setIsOpenModalNewUser] = useState(false)
  const { data, loading, error } = useAxios({ url: `${process.env.REACT_APP_API_URL}/users`, headers: {}});

  const openModalNewUser = () => {
    setIsOpenModalNewUser(true)
  }

  const closeModalNewUser = () => {
    setIsOpenModalNewUser(false)
  }

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <div className='flex'>
        <Sidebar />

        <main className='w-full'>
            <div className='head flex justify-between items-center my-8 mx-6 px-2'>
                <div className='title font-bold text-xl'>
                    <h1>Lista degli utenti presenti sul portale:</h1>
                </div>
                <div className='rounded-md bg-indigo-600 text-xl px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400'>
                    <button
                        type='button'
                        onClick={openModalNewUser}
                        className='flex items-center gap-x-2'
                    >
                        <UserPlusIcon className='w-6' />
                        Nuovo utente
                    </button>
                </div>
            </div>

            {!loading && error && (
                <div className="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{error}</div>
            )}
            {loading && <div>Caricamento in corso...</div>}
            
            <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-6'>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nome</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Stato</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nickname</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ruolo</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {!loading && data && data.map((user) => (
                        <SingleUserRow 
                            key={user._id}
                            {...user}
                        />
                        ))}
                    </tbody>
                    
                </table>
            </div>

            <NewUserModal 
                isOpenModalNewUser={isOpenModalNewUser}
                openModalNewUser={openModalNewUser}
                closeModalNewUser={closeModalNewUser}
            />
        </main>
    </div> 
  )
}

export default UserList