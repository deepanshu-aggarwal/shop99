import React from 'react'
import { HiInformationCircle } from 'react-icons/hi'


const About = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center -mt-[7rem] bg-gradient-to-b from-orange-500 to-yellow-300 backdrop-blur-3xl drop-shadow-md rounded-md background-opacity-[.1] '>
      <div className='w-[50rem] flex flex-col justify-start items-center text-center border rounded-md p-3 '>
        <HiInformationCircle  className='text-white text-3xl'/>
        <hr className='w-[95%] m-3' />
        <h1 className='text-white text-xl font-semibold mb-4'>This is a project made solely for education purpose and the full authority goes to the developer</h1>
        <h4 >The technology used to make this project includes <span>ReactJS, Redux Tailwind, Razorpay</span></h4>
      </div>
    </div>
  )
}

export default About