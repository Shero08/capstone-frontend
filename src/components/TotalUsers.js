import React, {useEffect} from 'react';
import useAxios from '../hooks/useAxios';

const TotalUsers = () => {

  const { data, loading } = useAxios({ url: `${process.env.REACT_APP_API_URL}/users`, headers: {}});

  useEffect(() => {
  }, [data])

  return (
    <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
        <div className="text-sm font-medium text-gray-500 truncate">
            Utenti totali
        </div>
        <div className="mt-1 text-3xl font-semibold text-gray-900">
            {data && data.totalDocuments}
        </div>
    </div>
  )
}

export default TotalUsers