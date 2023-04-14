import React from 'react';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Toaster } from 'react-hot-toast';
import UpdateUserModal from './UpdateUserModal'; 
import DeleteUserModal from './DeleteUserModal';

const SingleProjectRow = (props) => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const {title, description, category, author, file, status, editor, _id, isRefresh} = props;

  const openUpdateModal = () => {
    setIsOpenUpdate(true)
  }

  const openDeleteModal = () => {
    setIsOpenDelete(true)
  }

  const closeUpdateModal = () => {
    setIsOpenUpdate(false)
  }

  const closeDeleteModal = () => {
    setIsOpenDelete(false)
  } 

  return (
    <>
        <tr className="hover:bg-gray-50">

            <th className="px-6 py-4 font-normal text-gray-900">
                <div className="text-sm">
                    <div className="font-medium text-gray-700">{title}</div>
                    <div className="text-gray-400">{description}</div>
                </div>
            </th>

            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                <div className={`inline px-3 py-1 text-sm font-normal rounded-full text-white gap-x-2 bg-emerald-100/60 ${status ? 'bg-green-600' : 'bg-red-600'}`}>
                    {status}
                </div>    
            </td>

            <td className="px-6 py-4">{author.name} {author.surname}</td>

            <td className="px-6 py-4">{category}</td>

            <td className="px-6 py-4">{editor}</td>

            <td className="px-6 py-4">
                <div className="flex justify-end gap-4">
                    <button 
                        x-data="{ tooltip: 'Edite' }"
                        onClick={openUpdateModal}
                    >
                        <PencilIcon className='w-6' />
                    </button>
                    <button 
                        x-data="{ tooltip: 'Delete' }"
                        onClick={openDeleteModal}
                    >
                        <TrashIcon className='w-6' />
                    </button>
                </div>
            </td>
        </tr>

        <tr className='border-none'>
            <td>
                <UpdateUserModal 
                    isOpenUpdate={isOpenUpdate}
                    openUpdateModal={openUpdateModal}
                    closeUpdateModal={closeUpdateModal}
                    title={title}
                    description={description}
                    category={category}
                    author={author}
                    file={file}
                    status={status}
                    editor={editor}
                    id={_id}
                    isRefresh={isRefresh}
                />
            </td>

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
                <DeleteUserModal 
                    isOpenDelete={isOpenDelete}
                    openDeleteModal={openDeleteModal}
                    closeDeleteModal={closeDeleteModal}
                    title={title}
                    description={description}
                    author={author}
                    id={_id}
                />
            </td>
        </tr>
    </>
  )
}

export default SingleProjectRow