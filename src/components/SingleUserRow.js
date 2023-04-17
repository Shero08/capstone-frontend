import React from 'react';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Toaster } from 'react-hot-toast';
import UpdateUserModal from './UpdateUserModal'; 
import DeleteUserModal from './DeleteUserModal';

const SingleUserRow = (props) => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const {name, surname, nickname, email, birth, avatar, isActive, role, _id, isRefresh} = props;

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

            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="relative h-10 w-10">
                    <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={avatar}
                        alt={name}
                    />
                </div>
                <div className="text-sm">
                    <div className="font-medium text-gray-700">{name} {surname}</div>
                    <div className="text-gray-400">{email}</div>
                </div>
            </th>

            <td className="px-6 py-4">
                <span
                    className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                >
                <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-green-600' : 'bg-red-600'}`}></span>
                    {isActive ? 'Active' : 'Disabled'}
                </span>
            </td>

            <td className="px-6 py-4">{nickname}</td>

            <td className="px-6 py-4">{role}</td>

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
                    name={name}
                    surname={surname}
                    nickname={nickname}
                    email={email}
                    isActive={isActive}
                    role={role}
                    birth={birth}
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
                    name={name}
                    surname={surname}
                    id={_id}
                    isRefresh={isRefresh}
                />
            </td>
        </tr>
    </>
  )
}

export default SingleUserRow