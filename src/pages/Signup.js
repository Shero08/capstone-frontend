import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Toaster } from 'react-hot-toast';
import HotToast from "../classes/hotToastClass";
import usePostSignup from "../hooks/usePostSignup";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { data, error, post } = usePostSignup({ url: `${process.env.REACT_APP_API_URL}/users`, headers: {
    "Content-Type": "application/json"
  }});

  const toast = new HotToast();

  const handleSignup = (e) => {
    e.preventDefault()

    if(password !== confirmPassword){
      toast.passwordAlert()
      return
    }

    const updatedFormData = {
      ...formData,
      password: password
    };

    setFormData( updatedFormData );

    post(updatedFormData);

    if(error){
      console.log(error)
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='w-full h-screen flex items-center bg-gray-200'>
      <div className='mx-auto w-3/4 lg:w-2/4 bg-white rounded-md p-3 shadow-lg'>
        <h2>Ciao, ancora non sei già registrato?</h2>
        <h1>Procedi alla registrazione del tuo nuovo account</h1>

        <form onSubmit={handleSignup}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

            <div className="col-span-3">
              <div className="mt-2">
                <input 
                  type="text" 
                  name="name" 
                  id="user-name" 
                  placeholder="Mario" 
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
                  placeholder="Rossi" 
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
                  placeholder="Nickname" 
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
                  placeholder="gg/mm/aaaa" 
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
                  placeholder="example@domainmail.com" 
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
                  placeholder="Inserisci password" 
                  required
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
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  onChange={(e) =>
                    setConfirmPassword( e.target.value )
                  }
                />
              </div>
            </div>

          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">
              Resetta
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Registrati
            </button>
        </div>
        </form>
      </div>

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
    </div>
  )
}

export default Signup