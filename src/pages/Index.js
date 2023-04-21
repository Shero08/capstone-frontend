import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import home1 from '../assets/writing.png';
import home2 from '../assets/books.png';

const Index = () => {
  return (
    <>
      <Navbar />

      <main className="bg-white">
        <div className="mx-auto max-w-7xl items-center p-6 lg:px-8">

          <div className="hero w-full">
            <div className="md:flex">
              <div className="w-full md:w-1/2 pt-24 pb-16">
                <h1 className="font-bold text-3xl md:text-5xl mb-8 text-indigo-600">Benvenuto su inprinting.</h1>
                <h2 className="font-semibold text-xl md:text-3xl mb-6">Sei uno scrittore emergente?</h2>
                <p className="font-normal text-md md:text-xl mb-10">Inprinting offre servizi editoriali per tutte le tue esigenze di self
                    publishing. Tu pensa a scrivere, a tutti i dettagli ci pensiamo
                    noi!.</p>

                <Link  
                  to='/login'
                  className="bg-indigo-600 hover:bg-indigo-800 text-white py-3 px-8 rounded-lg text-md md:text-lg duration-200"
                >
                  Carica il tuo manoscritto
                </Link>
              </div>

              <div className="w-full md:w-1/2">
                <div
                  className="w-full card-img h-full bg-cover bg-top"
                  style={{ backgroundImage: `url(${home1})` }}
                ></div>
              </div>
            </div>
          </div>

        </div>

        <div className="bg-indigo-800 py-4">
          <div className="mx-auto max-w-7xl items-center p-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-6 gap-x-3 sm:grid-cols-2 xl:gap-x-6">
              <div>
                <div
                  className="w-full h-full bg-cover bg-top"
                  style={{ backgroundImage: `url(${home2})` }}
                ></div>
              </div>
              <div className="pt-16 pb-16">
                <p className="text-center text-white">
                    Il nostro team di esperti è nato per offrirti tutto ciò di cui hai bisogno per pubblicare il tuo libro in self-publishing. Editor,
                    designer e pubblicitari ti accompagneranno nel costruire il best seller che hai sempre sognato di pubblicare.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    
                    <div>
                      <div className="rounded"></div>
                      <h2>Beatrice</h2>
                      <h3>Editor</h3>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="mx-auto max-w-7xl items-center p-6 lg:px-8">
            <h1 className="font-semibold md:text-xl text-center">Cosa possiamo fare per te</h1>

            <div className="grid grid-cols-1 gap-y-6 gap-x-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-6 pb-8 px-8">
              <div className="">

              </div>
              <div className=""></div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Index;
