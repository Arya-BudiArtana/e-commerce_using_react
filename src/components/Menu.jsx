import React, { useEffect, useState } from "react";
import { GiFruitBowl } from "react-icons/gi";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
const Menu = () => {
  const [filter, setfilter] = useState("buah");

  const [{ foodItems }, dispatch] = useStateValue();
  return (
    <section className="w-full" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className="text-2xl font-semibold capitalize 
          relative text-green-800 before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-[6rem] before:bg-green-600
          transition-all ease-in-out duration-100 before:mt-3 before:bg-gradient-to-tr from-green-700 to-green-200"
        >
          apa yang anda butuhkan?
        </p>

        <div
          className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll
        scrollbar-none"
        >
          {categories &&
            categories.map((category) => (
              <motion.div key={category.id} whileTap={{scale: 0.8}}
                className={`group ${filter === category.urlParamName ? 'bg-green-600': 'bg-card'}  w-24 min-w-[94px] h-28 cursor-pointer rounded-lg shadow-lg
                      drop-shadow-lg flex flex-col gap-3 mt-5 hover:bg-green-600 items-center justify-center duration-150 transition-all ease-in-out`}
                onClick={()=>setfilter(category.urlParamName)}
              >
                <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-card': 'bg-green-600'}  group-hover:bg-card flex items-center justify-center`}>
                  <GiFruitBowl className={`${filter === category.urlParamName ? 'text-textColor' : 'text-white'} group-hover:text-textColor text-lg`}></GiFruitBowl>
                </div>
                <p className={`${filter === category.urlParamName ? 'text-white': 'text-textColor'} text-sm text-textColor group-hover:text-white`}>
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full items-center">
          <RowContainer flag={false} data={foodItems ?.filter(n => n.category == filter)}></RowContainer>
        </div>
      </div>
    </section>
  );
};

export default Menu;
