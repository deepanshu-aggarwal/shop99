import React from 'react'
import { MdShoppingCart } from "react-icons/md"
import Avatar from "./img/avatar.png"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // const [{user}, dispatch] = useStateValue()

    const login = async() => {
        const response = await signInWithPopup(firebaseAuth, provider)
        console.log(response);
    }
    
    return (
        <header className=' fixed z-50 w-screen p-6 px-16'>
            {/* desktop */}
            <div className="flex  w-full h-full items-center justify-between">
                <Link to='/' className="flex items-center gap-2">
                    <p className='text-headingColor text-xl font-bold'>Shop99</p>
                </Link>

                <div className='flex items-center gap-8 '>

                    <ul className='flex items-center gap-8 '>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 ease-in-out'>Home</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 ease-in-out'>Menu</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 ease-in-out'>About Us</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 ease-in-out'>Services</li>
                    </ul>

                    <motion.div whileTap={{ scale: .6 }}
                        className='relative flex items-center justify-center'>
                        <MdShoppingCart className='text-textColor text-2xl ml-8 cursor-pointer' />
                        <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className='text-xs text-white font-semibold '>2</p>
                        </div>
                    </motion.div>

                    <div className="relative">
                        <motion.img whileTap={{ scale: .6 }}
                            src={Avatar} alt="userProfile" 
                            onClick={login}
                            className='w-8 min-w-[40] h-8 min-h-[40] drop-shadow-xl' />
                    </div>
                </div>

            </div>
            {/* mobile */}
            {/* <div className="flex md:hidden w-full h-full "></div> */}
        </header>
    )
}

export default Header