import React, { useState } from "react";
import Logo from "../img/logo.png";
import User from "../img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      // console.log(response)
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <header className="w-screen fixed z-50 p-3 px-4 md:p-4 md:px-16 bg-primary">
      <div className="hidden md:flex w-full h-full">
        <Link to={"/"} className="items-center flex gap-2">
          <img src={Logo} alt="" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">Arya</p>
        </Link>
        <div className="flex items-center gap-8 ml-auto">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex  items-center gap-8 "
          >
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
          </motion.ul>

          <div className="flex relative items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer"></MdShoppingBasket>
            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-1 -right-3">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.8 }}
              src={user ? user.photoURL : User}
              alt=""
              onClick={login}
              className="w-10 min-w-[40px] h-10 min-h-[40px] shadow-2xl cursor-pointer rounded-full"
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex 
                flex-col absolute py-2 top-10 right-0"
              >
                {user && user.email === "aryabudiartana69@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className=" px-4 py-2 flex items-center gap-3 cursor-pointer
                 hover:bg-slate-200 transition-all duration-100 ease-in-out
                  text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:hidden w-full h-full ">

        <div className="flex relative items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer"></MdShoppingBasket>
            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-1 -right-3">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
        <Link to={"/"} className="items-center flex gap-2">
          <img src={Logo} alt="" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">Arya</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.8 }}
            src={user ? user.photoURL : User}
            alt=""
            onClick={login}
            className="w-10 min-w-[40px] h-10 min-h-[40px] shadow-2xl cursor-pointer rounded-full"
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex 
                flex-col absolute top-10 right-0"
            >
              {user && user.email === "aryabudiartana69@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              {/* <ul className="flex flex-col pt-2 px-4 py-1 gap-5 ">
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
              </ul> */}

              <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                Home
              </p>
              <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                Menu
              </p>
              <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                About Us
              </p>
              <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                Services
              </p>

              <p
                className="m-2 rounded-md shadow-md bg-gray-200 px-4 py-2 flex 
              items-center gap-3 cursor-pointer hover:bg-slate-300 transition-all 
              duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
