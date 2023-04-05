import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({});

  const handleSignup = (e) => {
    e.preventDefault()
  }

  return (
    <div className='w-full h-screen flex items-center bg-gray-200'>
      <div className='mx-auto w-3/4 lg:w-2/4 bg-white rounded-md p-3 shadow-lg'>
        <h2>Ciao, ancora non sei già registrato?</h2>
        <h1>Procedi alla registrazione del tuo nuovo account</h1>

        <form onSubmit={handleSignup}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-3">
              <div className="mt-2">
                <input 
                  type="text" 
                  name="name" 
                  id="user-name" 
                  placeholder="Mario" 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  onChange={(e) =>
                    setFormData({
                        ...formData,
                        surname: e.target.value,
                    })
                  }
                />
              </div>
            </div>

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

          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup