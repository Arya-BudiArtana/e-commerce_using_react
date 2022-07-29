import React from 'react'
import delivery from "../img/gojek.png";
import delivery2 from "../img/delivery.png";
const Home = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id='home'>
          <div className="py-2 flex-1 flex flex-col items-start md:items-start justify-center gap-6">
            <div className="flex items-center gap-2 justify-center bg-green-100 px-4 py-1 rounded-full">
              <p className="text-base font-semibold text-green-700">
                Gojek Delivery
              </p>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
                <img src={delivery} alt="" className="w-full object-contain" />
              </div>
            </div>
            <p className="text-[2rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
              Layanan Pesan Antar Terbaik Di
              <span className="text-green-700 text-[2.5rem] lg:text-[4.5rem]"> Kota Kamu</span>
            </p>
    
            <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
              dignissimos facilis quod omnis, ut fuga eius debitis ea aperiam
              perspiciatis cupiditate architecto ab sunt id?
            </p>
    
            <button type="button" className="bg-gradient-to-br from-green-300 to-green-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out
            duration-100 md:w-auto">
              Pesan Sekarang
            </button>
          </div>
          <div className="p-4 bg-blue-400 flex-1"></div>
        </section>
      );
    };

export default Home