import React from "react";

const Menu = () => {
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

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll
        scrollbar-none">
          <div className="group bg-card w-24 min-w-[94px] h-28 cursor-pointer rounded-lg
           drop-shadow-lg flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out"></div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
