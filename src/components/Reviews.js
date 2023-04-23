import React from 'react'
import reviews1 from '../assets/reviews1.jpg'

const Reviews = () => {
  return (
    <div className="bg-indigo-800 py-4">
        <div className="mx-auto max-w-7xl text-white items-center p-6 lg:px-8">
            <h1 className="font-semibold md:text-2xl text-center">Dicono di noi</h1>

            <div className='flex items-center justify-between pt-8'>
                <div className='flex items-center px-8'>
                    <div 
                        className='w-[100px] h-[100px] rounded-full bg-cover bg-center'
                        style={{ backgroundImage: `url(${reviews1})` }}
                    ></div>
                    <div>
                        <p>I servizi di Inprinting mi hanno permesso di poter
                            dedicarmi alla stesura del mio libro, senza preoccuparmi di
                            altro! Il servizio di editing è stato fondamentale per capire
                            come migliorare il testo e renderlo scorrevole e
                            avvincente!</p>
                        
                        <h1>Sarah</h1>
                        <h2>La cantina di casa Jones</h2>
                    </div>
                </div>

                <div className='flex items-center px-8'>
                    <div 
                        className='w-[100px] h-[100px] rounded-full bg-cover bg-center'
                        style={{ backgroundImage: `url(${reviews1})` }}
                    ></div>
                    <div>
                        <p>I servizi di Inprinting mi hanno permesso di poter
                            dedicarmi alla stesura del mio libro, senza preoccuparmi di
                            altro! Il servizio di editing è stato fondamentale per capire
                            come migliorare il testo e renderlo scorrevole e
                            avvincente!</p>
                        
                        <h1>Sarah</h1>
                        <h2>La cantina di casa Jones</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reviews