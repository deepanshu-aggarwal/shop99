import { parse } from 'postcss'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { TiTick } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './../img/delivery.png'
import '../App.css'
const SuccessFull = () => {

  const orderId = JSON.parse(localStorage.getItem('orderId'))

  return (
    <div className='w-full h-screen flex justify-center items-center -mt-[7rem] end drop-shadow-md rounded-md'>

      <div className='md:w-96 w-[85%] border rounded-md flex flex-col justify-start items-center p-2 text-center drop-shadow-sm z-10 bg-white opacity-[.85]'>
        <motion.div whileHover={{ scale: 1.45 }} className='mb-2'>
          <TiTick className='text-green-500 text-[2.5rem]   ' />
        </motion.div>
        <hr className='w-[95%] mb-3'/>
        <h1>Congratulations! You have made a successful Order</h1>
        <p>Your order id is:<span className='font-semibold '> {orderId}</span> </p>
        <div>
          <p className='text-base text-textColor mb-2'>Thankyou for Shopping with <span className='text-lg font-semibold text-orange-500'>Shop99</span></p>
          <motion.div whileHover={{ scale: 0.85 }} className='m-2' >
            <Link to='/' className='bg-orange-500 p-1 pr-4 pl-4   text-sm rounded-full text-white mt-3 font-semibold drop-shadow-md' >Continue Shopping</Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SuccessFull