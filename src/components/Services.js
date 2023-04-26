import React from 'react';
import editing from '../assets/editing.svg';
import adv from '../assets/advertising.svg';
import proof from '../assets/proof-reading.svg';
import translate from '../assets/translate.svg';
import layout from '../assets/layout.svg';
import web from '../assets/web-design.svg';

const Services = () => {
  return (
    <div className="py-4" id={'services'} >
          <div className="mx-auto max-w-7xl p-6 lg:px-8">
            <h1 className="font-semibold md:text-2xl text-center">I nostri servizi</h1>
            <p className='text-center md:px-64 py-4'>La missione di Inprinting è quella di aiutarti a pubblicare il tuo libro in totale
                libertà, offrendoti servizi di qualità. Puoi scegliere uno o più servizi sulla
                base delle tue esigenze:</p>

            <div className="grid grid-rows-6 gap-x-10 gap-y-8 sm:grid-rows-3 grid-flow-col pb-8 md:px-8 mt-10">
              <div className="flex items-center justify-between gap-x-6">
                <div>
                  <img 
                    className='w-16 h-auto bg-cover bg-center'
                    alt='' 
                    src={editing} 
                  />
                </div>
                <div className='flex-1'>
                  <h1 className='text-indigo-800 font-medium text-2xl mb-2'>Editing</h1>
                  <p className='font-normal text-md'>Lavoreremo insieme a te al tuo testo, per cercare di farlo
                      sbocciare nella sua forma migliore. Durante l’editing
                      cureremo la forma e il contenuto assicurandoci che nulla
                      nel tuo testo sia lasciato al caso.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-6">
                <div>
                  <img 
                    className='w-16 h-auto bg-cover bg-center'
                    alt='' 
                    src={proof} 
                  />
                </div>
                <div className='flex-1'>
                  <h1 className='text-indigo-800 font-medium text-2xl mb-2'>Correzione di bozze</h1>
                  <p className='font-normal text-md'>Ci assicureremo che il tuo testo sia privo di refusi e
                    ripetizioni di termini e che risulti pulito per favorire una
                    lettura scorrevole. Questo servizio consente di
                    consegnare al lettore un testo pulito senza ripetizioni,
                    frasi grammaticalmente scorrette ed errori di battitura.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-6">
                <div>
                  <img 
                    className='w-16 h-auto bg-cover bg-center'
                    alt='' 
                    src={layout} 
                  />
                </div>
                <div className='flex-1'>
                  <h1 className='text-indigo-800 font-medium text-2xl mb-2'>Design e impaginazione</h1>
                  <p className='font-normal text-md'>Ci prenderemo cura dell’aspetto estetico del tuo romanzo,
                    a partire dalla copertina, che dovrà essere un rimando
                    coerente al contenuto, un'anticipo dell'avventura che il
                    lettore affronterà durante la lettura, fino all'impaginazione
                    interna del testo.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-6">
                <div>
                  <img 
                    className='w-16 h-auto bg-cover bg-center'
                    alt='' 
                    src={translate} 
                  />
                </div>
                <div className='flex-1'>
                  <h1 className='text-indigo-800 font-medium text-2xl mb-2'>Traduzione</h1>
                  <p className='font-normal text-md'>Sei un scrittore straniero? Ci occuperemo di tradurre il tuo
                    testo così che tu possa inserirlo nel mercato italiano.
                    Attualmente effettuiamo traduzione dall’inglese, tedesco, russo.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-6">
                <div>
                  <img 
                    className='w-16 h-auto bg-cover bg-center'
                    alt='' 
                    src={adv} 
                  />
                </div>
                <div className='flex-1'>
                  <h1 className='text-indigo-800 font-medium text-2xl mb-2'>Promozione</h1>
                  <p className='font-normal text-md'>Pubblicizzeremo il tuo testo attraverso i nostri canali e,
                    previo tuo consenso, pubblicheremo i primi due capitoli
                    che saranno visualizzabili da altri utenti della piattaforma,
                    con cui potrai interagire per scambiare opinioni e iniziare
                    a creare la tua community.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-6">
                <div>
                  <img 
                    className='w-16 h-auto bg-cover bg-center'
                    alt='' 
                    src={web} 
                  />
                </div>
                <div className='flex-1'>
                  <h1 className='text-indigo-800 font-medium text-2xl mb-2'>Web Design</h1>
                  <p className='font-normal text-md'>Possiamo creare un sito web biografico che racconti di te,
                    delle tue pubblicazioni e che colleghi tutti i tuoi social in
                    un unico spazio tutto per te.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Services