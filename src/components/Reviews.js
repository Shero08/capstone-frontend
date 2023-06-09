import React from 'react'
import reviews1 from '../assets/reviews1.jpg'
import reviews2 from '../assets/reviews2.jpg'

const Reviews = () => {
  return (
    <div className="bg-indigo-800 py-4" id={'reviews'} >
        <div className="mx-auto max-w-7xl text-white p-6 lg:px-8">
            <h1 className="font-semibold text-xl md:text-2xl text-center">Dicono di noi</h1>

            <div className='md:flex items-center justify-between pt-4 md:pt-20 pb-4 md:pb-24 gap-x-14'>
                <div className='md:flex items-center justify-between flex-wrap mb-8 md:mb-0'>
                    <div 
                        className='w-[150px] h-[150px] rounded-full bg-cover bg-center mx-auto mb-4 md:mb-0'
                        style={{ backgroundImage: `url(${reviews1})` }}
                    ></div>

                    <div className='w-auto flex-1 text-center md:text-left md:pl-6'>
                        <p className='text-md italic'>I servizi di Inprinting mi hanno permesso di poter
                            dedicarmi alla stesura del mio libro, senza preoccuparmi di
                            altro! Il servizio di editing è stato fondamentale per capire
                            come migliorare il testo e renderlo scorrevole e
                            avvincente!</p>
                        
                        <h1 className='mt-3 text-xl'>Sarah</h1>
                        <h2 className='mt-0 text-sm italic'>La cantina di casa Jones</h2>
                    </div>
                </div>

                <div className='md:flex items-center justify-between flex-wrap'>
                    <div 
                        className='w-[150px] h-[150px] rounded-full bg-cover bg-center mx-auto mb-4 md:mb-0'
                        style={{ backgroundImage: `url(${reviews2})` }}
                    ></div>
                    <div className='w-auto flex-1 text-center md:text-left md:pl-6'>
                        <p className='text-md italic'>Inprinting ha dato un volto alla mia storia, il servizio di
                            design mi ha consentito di avere una copertina
                            accattivante e coerente con il mio racconto. Staff
                            disponibile e molto preparato!</p>
                        
                        <h1 className='mt-3 text-xl'>Giovanni</h1>
                        <h2 className='mt-0 text-sm italic'>La brigata del Joe's Whale</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reviews