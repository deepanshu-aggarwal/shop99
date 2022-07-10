import React, { useEffect, useRef , useState} from 'react'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { MdShoppingBasket } from 'react-icons/md'
import { categories } from '../utils/data'
import NotFound from '../img/NotFound.svg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const RowContainer = ({ flag, data, scrollVal }) => {
  const rowContainer = useRef()
  const [items, setItems] = useState([])
  const [{cartItems}, dispatch] = useStateValue()

  const addToCart = () => {
    
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items
    })
    localStorage.setItem("cartItems", JSON.stringify(items))
  }

  useEffect(() => {
    rowContainer.current.scrollLeft = scrollVal;
  }, [scrollVal])
  
  useEffect(() => {
    addToCart()
  },[items])

  return (
    <div ref={rowContainer} className={`w-full my-12 scroll-smooth flex
    ${flag ? `overflow-x-scroll scrollbar-none` : `overflow-x-hidden flex-wrap`}`}>
      {data && data.length > 0?

        (data.map(item => (
          <div
            key={item.id}
            className='w-275 h-[200px] min-w-[275px] md:w-300 md:min-w-[300px] mr-2 my-12 bg-cardOverlay rounded-lg p-2 backdrop-blur-lg   hover:drop-shadow-lg flex flex-col items-center justify-evenly relative '>
            <div className='w-full flex items-center justify-between'>
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div 
              onClick={() => setItems([...cartItems, item])} whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'>
                <MdShoppingBasket className='text-white ' />
              </motion.div>
            </div>

            <div className='w-full flex flex-col items-end justify-end '>
              <p className='text-textColor font-semibold text-base md:text-lg'>{item?.title}</p>
              <p className='mt-1 text-sm text-gray-500'>{item?.calories} Calories</p>
              <div className='flex items-center font-semibold gap-1'>

                <p className='text-lg text-headingColor font-semibold'>
                  <span className='text-sm text-red-500'>₹</span>{item?.price}
                </p>
                <p className='text-sm text-headingColor font-semibold'>⭐ 5</p>
              </div>

            </div>
          </div>
        ))
      ) : (
      <div className='w-full flex flex-col items-center justify-center'>
        <img src={NotFound} className='h-340' alt="" />
        <p className='text-xl font-semibold text-headingColor'>Items Not Available</p>
      </div>
      )}
    </div>
  )
}

export default RowContainer