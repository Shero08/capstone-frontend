import React from 'react';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {
  return (
    <div className='flex bg-capstone-bg w-full'>
      <Sidebar />

      <main className='flex-1 h-screen'>
        <div className="mt-12 lg:mx-12">
                <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-4">
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total users
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            12,00
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Profit
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            $ 450k
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Orders
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            20k
                        </div>
                    </div>
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Total Orders
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            20k
                        </div>
                    </div>
                </div>
          </div>
      </main>
    </div>
  )
}

export default AdminDashboard