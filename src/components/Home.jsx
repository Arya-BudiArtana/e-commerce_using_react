import React from "react";
import delivery from "../img/gojek.png";
import delivery2 from "../img/delivery.png";
import herobg from "../img/heroBg.png";
import i1 from "../img/f1.png";
import { herodata } from "../utils/data";

const Home = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
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
          <span className="text-green-700 text-[2.5rem] lg:text-[4.5rem]">
            {" "}
            Kota Kamu
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
          dignissimos facilis quod omnis, ut fuga eius debitis ea aperiam
          perspiciatis cupiditate architecto ab sunt id?
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-green-300 to-green-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out
            duration-100 md:w-auto"
        >
          Pesan Sekarang
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center">
        <div className="w-full flex items-center justify-center relative">
          <img
            src={herobg}
            alt=""
            className="lg:h-650 lg:w-auto ml-auto h-420 w-full"
          />
          <div
            className="w-full h-full absolute flex items-center 
                justify-center top-0 left-0 xl:px-32 py-4 gap-4 flex-wrap"
          >
            {herodata &&
              herodata.map((n) => (
                <div key={n.id} className="lg:w-190 min-w-[190px] pb-4 pt-4 px-1 bg-cardOverlay backdrop-blur-md 
                flex items-center justify-center flex-col rounded-3xl">
                  <img src={n.img} alt="" className="w-20 lg:w-40 -mt-10 lg:-mt-20" />
                  <p className="text-base lg:text-xl text-textColor font-semibold text-center">
                    {n.name}
                  </p>
                  <p className="text-sm text-lighttextGray font-semibold text-center my-2">
                    {n.desc}
                  </p>
                  <p className="text-sm font-semibold text-headingColor">
                    <span className="text-xs text-green-600">Rp</span> {n.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
