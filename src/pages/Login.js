import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePostLogin from "../hooks/usePostLogin";
import { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';
import home2 from '../assets/books.png';

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
    <div 
      style={{ backgroundImage: `url(${home2})` }}
      className='w-full h-screen flex items-center bg-indigo-800 bg-no-repeat bg-left-bottom bg-50% lg:bg-40%'
    >
      <div className='mx-auto w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/5 bg-white rounded-xl py-3 px-6 shadow-xl'>
        <Link to={'/'} className='block my-4'>
          <img className='w-32 mx-auto' src={logo} alt="Logo" />
        </Link>
        <h1 className='text-center font-bold text-xl md:text-2xl'>Accedi al tuo account</h1>

        <form onSubmit={handleLogin}>
          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-6">

            <div className="col-span-full">
              <div className="mt-2">
                <input 
                  type="email" 
                  name="email" 
                  autoComplete="email"
                  id="user-email" 
                  placeholder="Email" 
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
              <div className="mt-2">
                <div className='relative'>
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
                    className="icon_button absolute right-4 top-0 py-1.5 cursor-pointer"
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
            </div>

            <div className="mt-4 mb-2 col-span-full">
              <button 
                type="submit" 
                className="rounded-md w-full bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                  Accedi
              </button>
            </div>

          </div>
        </form>
        <div className='flex items-center justify-center gap-2 text-sm mb-4'>
          <span>Non hai un account?</span>
          <Link to='/signup' className='font-medium hover:underline duration-200'>Registrati</Link>
        </div>
        
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