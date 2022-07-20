import React from 'react'
import { HiInformationCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

const Service = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center -mt-[7rem] bg-gradient-to-b from-orange-500 to-yellow-300 backdrop-blur-3xl drop-shadow-xl rounded-md background-opacity-[.1] p-[1rem]'>
      <div className='md:w-[50rem] w-[80%] flex flex-col justify-start items-center text-center border rounded-md p-3 '>
        <HiInformationCircle  className='text-white text-3xl'/>
        <hr className='w-[95%] m-3' />
        <h1 className='text-white text-xl font-semibold mb-4'>Your laptop might heat - but your drinks will be served at best temperature</h1>
        <h4 >We have a wide range of services that revolve around serving you the best cuisine to your doorsptep</h4>
        
        <p className='mb-3'>We have one dish for every occasion and one dish for the nights that you only want to spend by yourself watching the upside down. </p>

        <motion.div whileHover={{ scale: 0.85 }} className='m-2' >
            <Link to='/' className='bg-orange-500 p-1 pr-4 pl-4   text-sm rounded-full text-white mt-3 font-semibold drop-shadow-md' >Buy Now</Link>
          </motion.div>
      </div>
    </div>
  )
}

export default Service