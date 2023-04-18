import React, { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Toaster } from 'react-hot-toast';
import DeleteProjectModal from './DeleteProjectModal';
import useSession from '../hooks/useSession';
import { Link } from 'react-router-dom';

const SingleProjectRow = (props) => {
  const session = useSession()
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [statusClass, setStatusClass] = useState('');
  const {title, description, createdAt, category, author, status, editor, _id, isRefresh} = props;

  const date = new Date(createdAt);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('it-IT', options);

  const openDeleteModal = () => {
    setIsOpenDelete(true)
  }

  const closeDeleteModal = () => {
    setIsOpenDelete(false)
  } 

  useEffect(() => {
    if (status === "in attesa") {
      setStatusClass("text-gray-600 bg-gray-300");
    } else if (status === "completo") {
      setStatusClass("text-white bg-green-600");
    } else if (status === "in lavorazione") {
      setStatusClass("text-black bg-orange-600"); 
    } else {
      setStatusClass("text-white bg-red-600");
    }
  }, [status]);

  return (
    <> 
        <tr className="hover:bg-gray-50">

            <th className="px-6 py-4 font-normal text-gray-900">
                <div className="text-sm">
                    <div className="font-medium text-gray-700">
                        <Link to={`/projects/${_id}`}>
                            {title}
                        </Link>
                    </div>
                    <div className="text-gray-400">{description}</div>
                </div>
            </th>

            <td className="px-6 py-4">{formattedDate}</td>

            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                <div className={`inline px-3 py-1 text-sm font-normal rounded-full text-white gap-x-2 bg-emerald-100/60 ${statusClass}`}>
                    {status}
                </div>    
            </td>

            <td className="px-6 py-4">{author.name} {author.surname}</td>

            <td className="px-6 py-4">
                <div className='flex gap-2'>
                {category && category.map((cat) => {
                    return (<span 
                        key={cat}
                        className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600'
                    >
                        {cat}
                    </span>)
                })}
                </div>
            </td>

            <td className="px-6 py-4">{editor ? (editor.name + ' ' + editor.surname) : 'Progetto in validazione'}</td>

            {session?.role === 'admin' ?
            <td className="px-6 py-4">
                <div className="flex justify-end gap-4">
                    <button 
                        x-data="{ tooltip: 'Delete' }"
                        onClick={openDeleteModal}
                    >
                        <TrashIcon className='w-6' />
                    </button>
                </div>
            </td>
            : ''}
        </tr>

        <tr className='border-none'>
            <td>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        className: '',
                        duration: 5000,
                        success: {
                            style: {
                            background: 'green',
                            color: 'white'
                            },
                        }
                    }}
                />
            </td>

            <td>
                <DeleteProjectModal 
                    isOpenDelete={isOpenDelete}
                    openDeleteModal={openDeleteModal}
                    closeDeleteModal={closeDeleteModal}
                    title={title}
                    description={description}
                    author={author}
                    id={_id}
                    isRefresh={isRefresh}
                />
            </td>
        </tr>
    </>
  )
}

export default SingleProjectRow