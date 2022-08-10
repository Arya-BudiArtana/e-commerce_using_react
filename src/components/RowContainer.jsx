import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import {MdShoppingBasket} from "react-icons/md"

const RowContainer = ({flag, data, scroll}) => {
  const rowContainer = useRef()
  useEffect(() => {
    rowContainer.current.scrollLeft += scroll
  }, [scroll])
  
  return (

    <div
    ref={rowContainer}
    className={`w-full my-12 flex items-center gap-3 scroll-smooth
    ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap"}`}>

      {
        data && data.map(item=> (
          <div key={item.id} className='md:w-300 w-275 h-min=[175px] min-w-[275px] md:min-w-[300px] hover:drop-shadow-lg  h-auto backdrop-blur-lg my-12 bg-cardOverlay rounded-lg p-2'>
          <div className=' w-full flex items-center justify-between'>
            <motion.img whileHover={{scale: 1.2}}
             className='w-40 h-40 -mt-8 drop-shadow-2xl'src={item?.imageURL} alt="" />
            <motion.div whileTap={{scale: 0.75}}
             className='w-8 h-8 rounded-full bg-red-700 flex items-center justify-center cursor-pointer'>
              <MdShoppingBasket className='text-white'></MdShoppingBasket>
            </motion.div>
          </div>
  
          <div className='w-fulll flex items-end justify-end flex-col'>
            <p className='text-textColor font-semibold md:text-lg text-base'>
              {item?.title}
            </p>
  
            <p className='mt-1 text-sm text-gray-500'>{item?.calories} Kkal</p>
            <div className='flex items-center gap-8'>
              <p className='text-lg text-headingColor font-semibold'>
                <span className='text-sm text-green-700'>Rp</span>{item?.price}</p>
            </div>
          </div>
        </div>
        ))
      }
    </div>
  )
}

export default RowContainer