import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <>
    <Navbar />
    
    <main className='bg-white'>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        Hello to capstone site
      </div>
    </main>

    <Footer />
    </>
  )
}

export default Index