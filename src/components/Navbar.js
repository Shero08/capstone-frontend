import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Popover } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)  

  return (
    <header className="bg-white lg:shadow sticky top-0">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className='mr-2'>
                <Link to='/'>
                    <img className='w-32' src={logo} alt="Logo" />
                </Link>
            </div>

            <div className="flex lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>

            <Popover.Group className="hidden lg:flex lg:ml-6 lg:gap-x-12">
                <Link to='/' className="text-sm font-normal leading-6 text-gray-900">
                    Chi siamo
                </Link>
                <Link to='/' className="text-sm font-normal leading-6 text-gray-900">
                    Servizi
                </Link>
                <Link to='/' className="text-sm font-normal leading-6 text-gray-900">
                    Contatti
                </Link>
            </Popover.Group>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link to='/login' className="text-sm font-normal leading-6 text-white mr-3 bg-indigo-800 hover:bg-indigo-600 py-1 px-4 rounded-lg">
                    Entra
                </Link>
            </div>
        </nav>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-10" />

            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                    <Link to='/' className="-m-1.5 p-1.5">
                        <img className='w-32' src={logo} alt="Logo" />
                    </Link>

                    <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                            <Link to='/'
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Chi siamo
                            </Link>
                            <Link to='/'
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Servizi
                            </Link>
                            <Link to='/'
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Contatti
                            </Link>
                        </div>

                    <div className="py-6">
                        <Link to='/login'
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                        >
                            Entra
                        </Link>
                    </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    </header>
  )
}

export default Navbar