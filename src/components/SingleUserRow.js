import React from 'react';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import UpdateUserModal from './UpdateUserModal';

const SingleUserRow = (props) => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const {name, surname, nickname, email, birth, avatar, isActive, role, _id} = props

  const openUpdateModal = () => {
    setIsOpenUpdate(true)
  }

  const closeUpdateModal = () => {
    setIsOpenUpdate(false)
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
                        x-data="{ tooltip: 'Delete' }"
                        onClick={openUpdateModal}
                    >
                        <TrashIcon className='w-6' />
                    </button>
                    <button 
                        x-data="{ tooltip: 'Edite' }"
                        onClick={openUpdateModal}
                    >
                        <PencilIcon className='w-6' />
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
                />
            </td>
        </tr>
    </>
  )
}

export default SingleUserRow