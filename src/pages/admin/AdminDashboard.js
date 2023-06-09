import React from 'react';
import Sidebar from '../../components/Sidebar';
import AreaChart from '../../components/AreaChart';
import TotalUsers from '../../components/TotalUsers';
import TotalProjects from '../../components/TotalProjects';
import ProjectDashboard from '../../components/ProjectDashboard';

const AdminDashboard = () => {
  return (
    <div className='flex bg-capstone-bg w-full'>
      <Sidebar />

      <main className='flex-1 ml-20 lg:ml-0'>
        <div className="mt-12 lg:mx-12">
                <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">

                    <TotalUsers />
                    
                    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                        <div className="text-sm font-medium text-gray-500 truncate">
                            Profitto Totale 
                        </div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">
                            € 450k
                        </div>
                    </div>
                    
                    <TotalProjects />

                </div>

            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
                <ProjectDashboard />

                <AreaChart />
            </div>
        </div>

      </main>
    </div>
  )
}

export default AdminDashboard