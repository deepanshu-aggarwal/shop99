import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { MdShoppingBasket } from 'react-icons/md'
import { categories } from '../utils/data'


const RowContainer = ({ flag, data, scrollVal }) => {
  const rowContainer = useRef()
  useEffect(() => {
    rowContainer.current.scrollLeft = scrollVal;
  }, [scrollVal])
  console.log(categories)
  return (
    <div ref={rowContainer} className={`w-full my-12 scroll-smooth
    ${flag ? `overflow-x-scroll scrollbar-none` : `overflow-x-hidden flex-wrap`}`}>
      {data && data.map(item => (
        <div
          key={item.id}
          className='w-275 h-[175px] md:h-[235px] min-w-[225] md:min-w-[340] md:w-340 my-12 bg-cardOverlay rounded-lg p-2 backdrop-blur-lg  hover:drop-shadow-lg '>
          <div className='w-full flex items-center justify-between'>
            <motion.img whileHover={{ scale: .75 }} src={item?.imageURL} className='w-40 -mt-8 drop-shadow-2xl' alt="" />
            <motion.div whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'>
              <MdShoppingBasket className='text-white ' />
            </motion.div>
          </div>

          <div className='w-full flex flex-col items-end justify-end'>
            <p className='text-textColor font-semibold text-base md:text-lg'>{item?.title}</p>
            <p className='mt-1 text-sm text-gray-500'>{item?.calories} Calories</p>
            <div className='flex flex-col items-center font-semibold gap-1'>

              <p className='text-lg text-headingColor font-semibold'>
                <span className='text-sm text-red-500'>₹</span>{item?.price}
              </p>
              <p className='text-sm text-headingColor font-semibold'>⭐ 5</p>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  )
}

export default RowContainer