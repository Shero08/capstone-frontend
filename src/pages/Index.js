import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Team from "../components/Team";
import home1 from '../assets/writing.png';
import Services from "../components/Services";
import Reviews from '../components/Reviews';
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const Index = () => {
  const teamRef = useRef(null)
  const servicesRef = useRef(null)
  const contactsRef = useRef(null)

  const [showScollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    const pagePosition = window.pageYOffset;

    if (pagePosition > 0) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <>
      <Navbar
        teamRef={teamRef}
        servicesRef={servicesRef}
        contactsRef={contactsRef}
      /> 

      <main className="bg-white">
        <div className="mx-auto max-w-7xl items-center p-6 lg:px-8">

          <div className="hero w-full">
            <div className="md:flex">
              <div className="w-full md:w-1/2 md:pt-24 pb-4 md:pb-16 text-center md:text-left">
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
                  className="w-full card-img h-[200px] md:h-full bg-cover bg-top"
                  style={{ backgroundImage: `url(${home1})` }}
                ></div>
              </div>
            </div>
          </div>

        </div>

        <div ref={teamRef}>
          <Team />
        </div>

        <div ref={servicesRef}>
        <Services /> 
        </div>

        <Reviews />
      </main>

      {showScollToTop &&
      <div className="fixed bottom-10 right-10">
        <button 
          onClick={scrollToTop}
          className="rounded-full shadow-xl p-4 bg-orange-400 hover:bg-orange-600 text-white duration-200"
        >
          <ChevronUpIcon className="w-8" />
        </button>
      </div>
      }

      <div ref={contactsRef}>
      <Footer />
      </div>
    </>
  );
};

export default Index;
