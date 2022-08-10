import React, { useRef, useState, useEffect } from "react";
import Home from "./Home";
import { motion } from "framer-motion";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import Menu from "./Menu";
import {useStateValue} from "../context/StateProvider"
const MainContainer = () => {
  const [{foodItems}, dispatch] = useStateValue()

  const [scroll, setScroll] = useState(0);

  useEffect(() => {}, [scroll])
  
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Home></Home>

      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl font-semibold capitalize 
          relative text-green-800 before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-green-600
          transition-all ease-in-out duration-100 before:mt-3 before:bg-gradient-to-tr from-green-700 to-green-200"
          >
            Produk Olahan Terbaik kami
          </p>

          <div className="hidden md:flex items-center gap-3">
            <motion.div
            onClick={()=>setScroll(-200)}
              whileTap={{ scale: 0.8 }}
              className="w-8 h-8 rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronLeft className="text-2xl text-white"></MdChevronLeft>
            </motion.div>
            <motion.div
            onClick={()=>setScroll(200)}
              whileTap={{ scale: 0.8 }}
              className="w-8 h-8 rounded-lg bg-green-600 hover:bg-green-700 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            >
              <MdChevronRight className="text-2xl text-white"></MdChevronRight>
            </motion.div>
          </div>
        </div>
        <RowContainer flag={true} data ={foodItems ?.filter((n) =>n.category === "olahan")} scroll = {scroll} />
      </section>

      <section className="w-full my-2">
        <Menu></Menu>
      </section>
    </div>
  );
};

export default MainContainer;
