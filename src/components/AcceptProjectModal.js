import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import HotToast from "../classes/hotToastClass";
import usePatchAxios from '../hooks/usePatchAxios';
import useSession from '../hooks/useSession';

const AcceptProjectModal = ({ isOpenAcceptModal, closeAcceptProjectModal, title, id, editor, isRefresh }) => {
  const toast = new HotToast();
  const session = useSession();
  const userToken = session && session?.userToken

  const { data, error, patch } = usePatchAxios({ url: `${process.env.REACT_APP_API_URL}/projects/${id}`, headers: {
    "Content-Type": "application/json",
    "Authorization": userToken
  }});
  
  const handleAccept = (e) => {
    e.preventDefault()

    const acceptStatus = {
        status: 'in lavorazione',
        editor: editor
    }

    console.log(acceptStatus);

    patch(acceptStatus).then(() => {
        closeAcceptProjectModal()
        isRefresh()
    })

    if(error){
      console.log(error)
    }
  };

  return (
    <>
        <Transition appear show={isOpenAcceptModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeAcceptProjectModal}>
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
                            Vuoi prendere in carico il progetto: {title}?
                        </Dialog.Title>
                        <form className="mt-2" onSubmit={handleAccept}>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button 
                                    type='button'
                                    onClick={closeAcceptProjectModal}
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Accetta
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

export default AcceptProjectModal