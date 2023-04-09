import React, {useState} from 'react';
import { Bars3Icon, UserCircleIcon, HomeIcon, InboxStackIcon, ArrowLeftOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useSession from "../hooks/useSession";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true)
  const session = useSession()

  const handleLogout = () => {
    localStorage.clear();

    navigate('/', { replace: true })
  }

  return (
    <aside className={`${open ? 'w-72': 'w-20'} duration-300 h-screen p-5 pt-8 bg-gray-800 text-white md:relative fixed z-50`}>
        <button
            type='button'
            className=''
            onClick={() => setOpen(!open)}
        >
            <Bars3Icon className="h-9 w-9 text-white" aria-hidden="true" />
        </button>

        <div className='brand mx-auto py-3'>
            <div className='avatar flex justify-center'>
                <Link to='/profile'>
                    {(session?.avatar) 
                        ? <img alt='' className="w-20 text-gray-300 rounded-full" src={session.avatar} /> 
                        : <UserCircleIcon className="w-20 text-gray-300" aria-hidden="true" />}
                </Link>
            </div>
            <h3 className={`origin-left mt-3 font-medium hover:text-white text-gray-300 text-xl text-center duration-300 ${!open && 'scale-0'}`}>
                <Link to='/profile'>
                    {session?.name} {session?.surname}
                </Link>
            </h3>
        </div>

        <ul className='pt-6'>
            <li className='text-xl font-medium p-2 hover:bg-opacity-25 hover:bg-gray-200 rounded-md duration-150 mb-3'>
                <Link to='/admin' className='flex items-center gap-x-4'>
                    <HomeIcon className='w-6 ' /> 
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>Dashboard</span>
                </Link>
            </li>

            {session?.role === 'admin' &&
            <li className='text-xl font-medium p-2 hover:bg-opacity-25 hover:bg-gray-200 rounded-md duration-150 mb-3'>
                <Link to='/admin/user' className='flex items-center gap-x-4'>
                    <UserIcon className='w-6 ' /> 
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>Utenti</span>
                </Link>
            </li>
            }

            <li className='text-xl font-medium p-2 hover:bg-opacity-25 hover:bg-gray-200 rounded-md duration-150 mb-3'>
                <Link to='#' className='flex items-center gap-x-4'>
                    <InboxStackIcon className='w-6 ' /> 
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>Lavori</span>
                </Link>
            </li>
            <li className='text-xl font-medium p-2 hover:bg-opacity-25 hover:bg-gray-200 rounded-md duration-150 mb-3'>
                <button 
                    className='flex items-center gap-x-4'
                    onClick={handleLogout}
                >
                    <ArrowLeftOnRectangleIcon className='w-6 ' /> 
                    <span className={`${!open && 'hidden'} origin-left duration-200`}>Esci</span>
                </button>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar