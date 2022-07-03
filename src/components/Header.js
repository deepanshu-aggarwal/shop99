import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md"
import Avatar from "./img/avatar.png"
import { motion } from "framer-motion"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            })
            localStorage.setItem('user', JSON.stringify(providerData[0]))
        }
        else {
            setIsMenu(!isMenu);
        }
    }

    return (
        <header className=' fixed z-50 w-screen p-6 px-16'>
            {/* desktop */}
            <div className="md:flex  w-full h-full items-center justify-between">
                <Link to='/' className="flex items-center gap-2">
                    <p className='text-headingColor text-xl font-bold'>Shop99</p>
                </Link>

                <div className='flex items-center gap-8 '>

                    <ul className='flex items-center gap-8 '>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out'>Home</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out'>Menu</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out'>About Us</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out'>Services</li>
                    </ul>

                    <motion.div whileTap={{ scale: .6 }}
                        className='relative flex items-center justify-center'>
                        <MdShoppingCart className='text-textColor text-2xl cursor-pointer' />
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className='text-xs text-white font-semibold '>2</p>
                        </div>
                    </motion.div>

                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: .6 }}
                            src={user ? user.photoURL : Avatar}
                            alt="userProfile"
                            onClick={login}
                            className='w-8 min-w-[40] h-8 min-h-[40] cursor-pointer drop-shadow-xl rounded-full'
                        />
                        {
                            isMenu && (
                                <div className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-10 right-0'>
                                    {user && user.email === "dummygamer18@gmail.com" && (
                                        <Link to='/createItem'>
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">New Item <MdAdd /></p>
                                        </Link>
                                    )}
                                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">Logout <MdLogout /></p>
                                </div>
                            )
                        }

                    </div>
                </div>

            </div>
            {/* mobile */}
            {/* <div className="flex md:hidden w-full h-full "></div> */}
        </header>
    )
}

export default Header