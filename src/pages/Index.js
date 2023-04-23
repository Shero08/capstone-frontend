import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Team from "../components/Team";
import home1 from '../assets/writing.png';
import Services from "../components/Services";
import Reviews from '../components/Reviews';

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
                  className="bg-indigo-800 hover:bg-indigo-600 text-white py-3 px-8 rounded-lg text-md md:text-lg duration-200"
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

        <Team />

        <Services /> 

        <Reviews />
      </main>

      <Footer />
    </>
  );
};

export default Index;
