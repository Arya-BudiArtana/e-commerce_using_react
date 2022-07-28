import React from "react";
import Logo from "../img/logo.png";
import User from "../img/avatar.png";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
const Header = () => {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider();
  const login = async () => {
    const response = await signInWithPopup(firebaseAuth, provider);
    console.log(response)
  };
  return (
    <header className="w-screen fixed z-50 p-6 px-16">
      <div className="hidden md:flex w-full h-full">
        <Link to={"/"} className="items-center flex gap-2">
          <img src={Logo} alt="" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">Arya</p>
        </Link>
        <div className="flex items-center gap-8 ml-auto">
          <ul className="flex  items-center gap-8 ">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              services
            </li>
          </ul>

          <div className="flex relative items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer"></MdShoppingBasket>
            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-1 -right-3">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={User}
              alt=""
              onClick={login}
              className="w-10 min-w-[40px] h-10 min-h-[40px] shadow-2xl cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="block md:hidden w-full h-full "></div>
    </header>
  );
};

export default Header;
