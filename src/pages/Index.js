import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        <div className="mx-auto max-w-7xl items-center p-6 lg:px-8">

          <div className="hero pt-2 md:pt-14 pb-6 w-full">
            <div className="md:flex">
              <div className="w-full md:w-1/2">
                <h1 className="font-bold text-3xl md:text-5xl mb-8">Benvenuto su inprinting.</h1>
                <h2 className="font-semibold text-xl md:text-3xl mb-6">La piattaforma per il self-publishing</h2>
                <p className="font-normal text-md md:text-xl mb-10">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet torem ipsum 
                  dolor sit amet. Lorem ipsum dolor sit amet.</p>

                <Link 
                  to='/login'
                  className="bg-indigo-500 text-white py-2 px-4 rounded-lg text-md md:text-xl"
                >
                  Carica manoscritto
                </Link>
              </div>

              <div className="w-full md:w-1/2"></div>
            </div>
          </div>

        </div>

        <div className="bg-indigo-200 py-4">
          <div className="mx-auto max-w-7xl items-center p-6 lg:px-8">
            <h1 className="font-semibold text-white md:text-xl text-center">Cosa possiamo fare per te</h1>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Index;
