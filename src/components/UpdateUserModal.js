import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import HotToast from "../classes/hotToastClass";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import usePatchAxios from '../hooks/usePatchAxios';
import useSession from '../hooks/useSession';

const UpdateUserModal = ({ isOpenUpdate, closeUpdateModal, name, surname, nickname, email, isActive, role, birth, id, isRefresh }) => {
  const toast = new HotToast();
  const session = useSession();
  const userToken = session && session?.userToken
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { data, error, patch } = usePatchAxios({ url: `${process.env.REACT_APP_API_URL}/users/${id}`, headers: {
    "Content-Type": "application/json",
    "Authorization": userToken
  }});
  

  const handleUpdate = (e) => { 
    e.preventDefault()

    if(password !== confirmPassword){
      toast.passwordAlert()
      return
    }

    let updatedFormData = { ...formData };
    
    if(password !== ''){
        updatedFormData = {
            ...formData,
            password: password
        };
    }

    console.log(updatedFormData);

    setFormData( updatedFormData );

    patch(updatedFormData).then(() => { 
        closeUpdateModal()

        isRefresh()
    });

    if(error){
      console.log(error)
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
        <Transition appear show={isOpenUpdate} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeUpdateModal}>
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
                            Modifica utente: {name} {surname}
                        </Dialog.Title>
                        <form className="mt-2" onSubmit={handleUpdate}>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

                            <div className="col-span-3">
                                <div className="mt-2">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="user-name" 
                                        defaultValue={name} 
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="mt-2">
                                    <input 
                                        type="text" 
                                        name="surname" 
                                        id="user-surname" 
                                        defaultValue={surname}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                surname: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="mt-2">
                                    <input 
                                        type="text" 
                                        name="nickname" 
                                        id="user-nickname" 
                                        defaultValue={nickname}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nickname: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="mt-2">
                                    <input 
                                        type="date" 
                                        name="birth" 
                                        id="user-birth" 
                                        defaultValue={birth}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                birth: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-span-3 lg:col-span-full">
                                <div className="mt-2">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="user-email" 
                                        defaultValue={email}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="mt-2 relative">
                                    <input 
                                        type={!showPassword ? 'password' : 'text'}
                                        name="password" 
                                        id="user-password" 
                                        placeholder="Modifica password" 
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) =>
                                            setPassword( e.target.value )
                                        }
                                    />

                                    <div
                                        className="icon_button absolute right-4 top-0 py-1.5"
                                        onClick={handleClickShowPassword}
                                    >
                                        {!showPassword ? (
                                            <EyeIcon className="h-6 font-extralight" />
                                        ) : (
                                            <EyeSlashIcon className="h-6 font-extralight" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="mt-2">
                                    <input 
                                        type="password" 
                                        name="confirmPassword" 
                                        id="confirm-password" 
                                        placeholder="Conferma password"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) =>
                                            setConfirmPassword( e.target.value )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Ruolo utente
                                </label>
                                <div className="mt-2">
                                    <select 
                                        name="role" 
                                        id="user-role"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                role: e.target.value,
                                            })
                                        }
                                    >
                                        <option>{role}</option>
                                        <option>{role === 'admin' ? 'user' : 'admin'}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Stato utente
                                </label>
                                <div className="mt-2">
                                    <select 
                                        name="isActive" 
                                        id="user-active"
                                        defaultValue={isActive}
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                isActive: e.target.value,
                                            })
                                        }
                                    >
                                        <option value={true}>Attivo</option>
                                        <option value={false}>Disattivato</option>
                                    </select>
                                </div>
                            </div>

                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button 
                                    type='button'
                                    onClick={closeUpdateModal}
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Modifica
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

export default UpdateUserModal