import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePostLogin from "../hooks/usePostLogin";
import { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const Login = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { data, error, post } = usePostLogin({ url: `${process.env.REACT_APP_API_URL}/login`, headers: {
    "Content-Type": "application/json"
  }});

  const handleLogin = (e) => {
    e.preventDefault()

    post(formData)
    
    if(error){
      console.log(error)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='w-full h-screen flex items-center bg-gray-200'>
      <div className='mx-auto w-3/4 lg:w-1/4 bg-white rounded-md p-3 shadow-lg'>
        <h2>Ciao, sei già registrato?</h2>
        <h1>Accedi al tuo account</h1>

        <form onSubmit={handleLogin}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <div className="mt-2">
                <input 
                  type="email" 
                  name="email" 
                  autoComplete="email"
                  id="user-email" 
                  placeholder="example@domainmail.com" 
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  onChange={(e) =>
                    setFormData({
                        ...formData,
                        email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-span-full">
              <div className="mt-2 relative">
                <input 
                  type={!showPassword ? 'password' : 'text'}
                  name="password" 
                  id="user-password" 
                  required
                  placeholder='Inserisci password'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  onChange={(e) =>
                    setFormData({
                        ...formData,
                        password: e.target.value,
                    })
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

            <div className="mt-6">
              <button 
                type="submit" 
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                  Accedi
              </button>
            </div>

          </div>
        </form>

        <Link to='/signup'>Registrati</Link>
      </div>


      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: '',
          duration: 9000
        }}
      />
    </div> 
  )
}

export default Login