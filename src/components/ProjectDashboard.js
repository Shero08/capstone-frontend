import React, {useState, useEffect} from 'react';
import useAxios from '../hooks/useAxios';
import LoadingIndicator from './LoadingIndicator';
import Pagination from './Pagination';

const ProjectDashboard = () => {
  const [totPages, setTotPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const status = 'in lavorazione';
  
  const { data, loading, error, isRefresh } = useAxios({ url: `${process.env.REACT_APP_API_URL}/projects?status=${status}&limit=${limit}`, headers: {}});

  useEffect(() => {
    if(data){
        setTotPages(data.totalPages)
    }
  }, [data])

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='bg-white rounded-lg shadow'>
        <div className='bg-gray-100 w-full flex items-center py-4 px-4 rounded-t-xl font-medium text-gray-900'>
            <div className='text-sm w-1/3'>Progetti in lavorazione</div>
            <div className='text-sm w-1/3'>Data</div>
            <div className='text-sm w-1/3'>Stato</div>
        </div>

        {!loading && error && (
            <div className="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{error}</div>
        )}
        {loading && <div className='mx-auto'><LoadingIndicator /></div>}
        <div className='divide-y divide-gray-100 border-t border-gray-100'>

            {!loading && data && data.projects && data.projects.map((project) => (
                
            <div key={project._id} className='flex items-center py-4 px-4'>
                <div className='text-sm w-1/3'>
                    <div className='font-medium text-gray-700'>{project.title}</div>
                    <div className='text-gray-400'>{project?.author.name} {project?.author.surname}</div>
                </div>

                <div className='text-sm w-1/3'>
                    {new Date(project.createdAt).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                </div>

                <div className='text-sm w-1/3'>
                    <div className='inline px-3 py-1 text-sm font-normal rounded-full text-white gap-x-2 bg-emerald-100/60 bg-orange-600'>
                        {project.status}
                    </div>
                </div>
            </div>
            ))}

            <Pagination 
                handlePrevClick={handlePrevClick} 
                handleNextClick={handleNextClick}
                totPages={totPages}
                currentPage={currentPage}
                totalDocuments={data.totalDocuments}
            />
        </div>
    </div> 
  )
}

export default ProjectDashboard