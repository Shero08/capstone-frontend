import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePostLogin from "../hooks/usePostLogin";

const Login = () => {
  const [formData, setFormData] = useState({});

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

  return (
    <div className='container'>
      <div>
        <h1>Pagina Login</h1>

        <form onSubmit={handleLogin}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <div className="mt-2">
                <input 
                  type="email" 
                  name="email" 
                  id="user-email" 
                  placeholder="example@domainmail.com" 
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
                <input 
                  type="password" 
                  name="password" 
                  id="user-password" 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  onChange={(e) =>
                    setFormData({
                        ...formData,
                        password: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button 
                type="submit" 
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                  Save
              </button>
            </div>

          </div>
        </form>
      </div>

      <Link to='/signup'>Registrati</Link>
    </div> 
  )
}

export default Login