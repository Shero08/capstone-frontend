import React from "react";
import home2 from '../assets/books.png';
import team1 from '../assets/team1.jpg';
import team2 from '../assets/team2.jpg';
import team3 from '../assets/team3.jpg';
import team4 from '../assets/team4.jpg';
import team5 from '../assets/team5.jpg';

const Team = () => {
  return (
    <div className="bg-indigo-800 py-4" id={'team'}>
      <div className="mx-auto max-w-7xl items-center p-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-6 gap-x-3 sm:grid-cols-2 xl:gap-x-6">
          <div>
            <div
              className="w-full h-full bg-cover bg-top"
              style={{ backgroundImage: `url(${home2})` }}
            ></div>
          </div>
          <div className="md:pt-16 pb-4 md:pb-16">
            <p className="text-center text-white mb-8">
              Il nostro team di esperti è nato per offrirti tutto ciò di cui hai
              bisogno per pubblicare il tuo libro in self-publishing. Editor,
              designer e pubblicitari ti accompagneranno nel costruire il best
              seller che hai sempre sognato di pubblicare.
            </p>

            <div className="flex flex-wrap gap-y-6 justify-center">
              <div className="text-center text-white px-8">
                <div 
                    className="w-[120px] min-h-[120px] mx-auto bg-cover bg-top rounded-full"
                    style={{ backgroundImage: `url(${team1})` }}
                ></div>
                <h2 className="text-lg mt-1">Beatrice</h2>
                <h3 className="text-sm">Editor</h3>
              </div>

              <div className="text-center text-white px-8">
                <div 
                    className="w-[120px] min-h-[120px] mx-auto bg-cover bg-top rounded-full"
                    style={{ backgroundImage: `url(${team2})` }}
                ></div>
                <h2 className="text-lg mt-1">Veronica</h2>
                <h3 className="text-sm">Correzione bozze</h3>
              </div>

              <div className="text-center text-white px-8">
                <div 
                    className="w-[120px] min-h-[120px] mx-auto bg-cover bg-top rounded-full"
                    style={{ backgroundImage: `url(${team3})` }}
                ></div>
                <h2 className="text-lg mt-1">Erika</h2>
                <h3 className="text-sm">Publishing strategist</h3>
              </div>

              <div className="text-center text-white px-8">
                <div 
                    className="w-[120px] min-h-[120px] mx-auto bg-cover bg-top rounded-full"
                    style={{ backgroundImage: `url(${team4})` }}
                ></div>
                <h2 className="text-lg mt-1">Andrea</h2>
                <h3 className="text-sm">Illustratore</h3>
              </div>

              <div className="text-center text-white px-8">
                <div 
                    className="w-[120px] min-h-[120px] mx-auto bg-cover bg-top rounded-full"
                    style={{ backgroundImage: `url(${team5})` }}
                ></div>
                <h2 className="text-lg mt-1">Marika</h2>
                <h3 className="text-sm">Designer</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
