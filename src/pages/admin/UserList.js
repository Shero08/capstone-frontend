import React from 'react';
import Sidebar from '../../components/Sidebar';
import SingleUserRow from '../../components/SingleUserRow';
import useAxios from '../../hooks/useAxios';

const UserList = () => {
  const { data, loading, error } = useAxios({ url: `${process.env.REACT_APP_API_URL}/users`, headers: {}});
  console.log(data);  

  return (
    <div className='flex'>
        <Sidebar />

        <main className='w-full'>

            {!loading && error && (
                <div className="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{error}</div>
            )}
            {loading && <div>Caricamento in corso...</div>}
            
            <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-6'>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">State</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nickname</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Role</th>
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
        </main>
    </div> 
  )
}

export default UserList