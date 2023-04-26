import React from 'react';
import footer1 from '../assets/woman.png';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-indigo-600 text-white' id={'contacts'}>
      <div className="mx-auto max-w-7xl p-6 lg:px-8"> 
        <div className='grid grid-cols-1 gap-y-6 gap-x-3 sm:grid-cols-2 xl:gap-x-6'>
          <div className='md:py-48 md:pr-28 text-center md:text-left'>
            <h1 className='text-xl md:text-4xl font-medium mb-4'>Vuoi richiedere informazioni?</h1>
            <div className='text-md'>
              Se desideri capire quale servizio risponde alle tue esigenze,
              scrivici una mail a <Link className='font-bold hover:underline' to='#'>domande@imprinting.it</Link>
            </div>
          </div>

          <div className=''>
            <div
              className="w-full h-[250px] md:h-full bg-cover bg-top"
              style={{ backgroundImage: `url(${footer1})` }}
            ></div>
          </div>
        </div>

        <div className='w-full'>
          <div className='text-center text-md'>2023 © Inprinting - Tutti i diritti riservati | P.IVA 123456789 | <Link className='hover:underline' to='#'>Privacy Policy</Link></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer