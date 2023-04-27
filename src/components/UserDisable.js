import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useSession from "../hooks/useSession";
import HotToast from "../classes/hotToastClass";
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import usePatchAxios from '../hooks/usePatchAxios';

const UserDisable = () => {
  const navigate = useNavigate();
  const toast = new HotToast();
  const session = useSession();
  const userSession = session && session?.userSession
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});

  const id = userSession?.id
  
  const { error, patch } = usePatchAxios({
    url: `${process.env.REACT_APP_API_URL}/users/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const openUserDisableModal = () => {
    setOpenModal(true)
  }

  const closeUserDisableModal = () => {
    setOpenModal(false)
  }

  const handleDisable = (e) => {
    e.preventDefault()

    const userActive = { 
        ...formData,
        isActive: false
    };

    console.log(userActive);
    
    patch(userActive).then(() => {
        closeUserDisableModal()
        localStorage.clear();

        setTimeout(() => {
            navigate('/', { replace: true })
        }, 1000)
    })
  };

  return (
    <>
        <div className="px-6 py-5 text-md text-gray-500">
            <div>Dati e privacy</div>
        </div>

        <div className='px-6 pb-6'>
            {userSession?.role !== 'admin' ?
            <button
                type='button'
                onClick={openUserDisableModal}
                className=''
            >
                Elimina il tuo account
            </button>
            : ''
            }
        </div>

        <Transition appear show={openModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeUserDisableModal}>
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
                            Ciao {userSession?.name} {userSession?.surname}, ci dispiace che tu vada via, sei sicuro di voler eliminare il tuo account?
                        </Dialog.Title>
                        <form className="mt-2" onSubmit={handleDisable}>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button 
                                    type='button'
                                    onClick={closeUserDisableModal}
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

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: "",
            duration: 5000,
            success: {
              style: {
                background: "green",
                color: "white",
              },
            },
          }}
        />
    </>
  )
}

export default UserDisable