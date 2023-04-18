import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import HotToast from "../classes/hotToastClass";
import useDeleteAxios from '../hooks/useDeleteAxios';
import useSession from '../hooks/useSession';

const DeleteProjectModal = ({ isOpenDelete, closeDeleteModal, title, id, isRefresh }) => {
  const toast = new HotToast();
  const session = useSession();
  const userToken = session && session?.userToken

  const { deleteData, error } = useDeleteAxios({ url: `${process.env.REACT_APP_API_URL}/projects/${id}`, headers: {
    "Authorization": userToken
  }});
  
  const handleDelete = (e) => {
    e.preventDefault()

    deleteData().then(() => {
        closeDeleteModal()
        isRefresh()
    })

    if(error){
      console.log(error)
    }
  };

  return (
    <>
        <Transition appear show={isOpenDelete} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Vuoi eliminare il progetto: {title}?
                        </Dialog.Title>
                        <form className="mt-2" onSubmit={handleDelete}>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button 
                                    type='button'
                                    onClick={closeDeleteModal}
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Elimina
                                </button>
                            </div>
                        </form>

                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
  )
}

export default DeleteProjectModal