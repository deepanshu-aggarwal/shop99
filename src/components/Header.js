import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md"
import Avatar from "../img/avatar.png"
import { motion } from "framer-motion"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
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

    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null
        })
    }
    {console.log("img", user?.photoURL)}
    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary" >

            {/* desktop */}
            <div className="hidden md:flex  w-full h-full items-center justify-between">
                <Link to='/' className="flex items-center gap-2">
                    <p className='text-headingColor text-xl font-bold'>Shop99</p>
                </Link>

                <div className='flex items-center gap-8 '>

                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className='flex items-center gap-8 '>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out' onClick={() => setIsMenu(false)}>Home</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out' onClick={() => setIsMenu(false)}>Menu</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out' onClick={() => setIsMenu(false)}>About Us</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out' onClick={() => setIsMenu(false)}>Services</li>
                    </motion.ul>

                    <motion.div whileTap={{ scale: .6 }}
                        onClick={showCart}
                        className='relative flex items-center justify-center'>
                        <MdShoppingCart className='text-textColor text-2xl cursor-pointer' />
                        {cartItems && cartItems.length > 0 && (
                            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    {cartItems.length}
                                </p>
                            </div>
                        )}
                    </motion.div>

                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: .6 }}
                            src={user ? user.photoURL  : Avatar}
                            alt="userProfile"
                            onClick={login}
                            className='w-8 min-w-[40] h-8 min-h-[40] cursor-pointer drop-shadow-xl rounded-full'
                        />
                        {
                            isMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: .6 }}
                                    exit={{ opacity: 0, scale: .6 }}
                                    className='w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-4 -right-2'>
                                    {user && user.email === "dummygamer18@gmail.com" && (
                                        <Link to='/createItem'>
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base" onClick={() => setIsMenu(false)}>New Item <MdAdd /></p>
                                        </Link>
                                    )}
                                    <p
                                        onClick={logout}
                                        className="px-4 py-2 m-2 p-2 shadow-md rounded-md flex items-center gap-3  bg-gray-100 cursor-pointer hover:bg-gray-300  transition-all duration-100 ease-in-out text-textColor text-base">Logout <MdLogout /></p>
                                </motion.div>
                            )
                        }

                    </div>
                </div>
            </div>
            {/* mobile */}
            <div className="flex items-center justify-between md:hidden w-full h-full ">


                <Link to='/' className="flex items-center gap-2">
                    <p className='text-headingColor text-xl font-bold'>Shop99</p>
                </Link>

                <div className="relative flex justify-between items-center w-24">
                    <motion.div whileTap={{ scale: .6 }} onClick={showCart}
                        className='relative flex items-center justify-center'>
                        <MdShoppingCart className='text-textColor text-2xl cursor-pointer' />
                        {cartItems && cartItems.length > 0 && (
                            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    {cartItems.length}
                                </p>
                            </div>
                        )}
                    </motion.div>

                    <motion.img
                        whileTap={{ scale: .6 }}
                        src={user ? user.photoURL : Avatar}
                        alt="userProfile"
                        onClick={login}
                        className='w-8 min-w-[40] h-8 min-h-[40] cursor-pointer drop-shadow-xl rounded-full'
                    />
                    {
                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: .6 }}
                                exit={{ opacity: 0, scale: .6 }}
                                className='w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute -top-2 -right-6'>
                                {user && user.email === "dummygamer18@gmail.com" && (
                                    <Link to='/createItem'>
                                        <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">New Item <MdAdd /></p>
                                    </Link>
                                )}

                                <ul
                                    className='flex flex-col '>
                                    <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out hover:bg-slate-100 px-4 py-2' onClick={() => setIsMenu(false)}>Home</li>
                                    <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out px-4 py-2 hover:bg-slate-100' onClick={() => setIsMenu(false)}>Menu</li>
                                    <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out px-4 py-2 hover:bg-slate-100' onClick={() => setIsMenu(false)}>About Us</li>
                                    <li className='text-base text-textColor cursor-pointer hover:text-headingColor transition-all duration-100 ease-in-out px-4 py-2 hover:bg-slate-100' onClick={() => setIsMenu(false)}>Services</li>
                                </ul>

                                <p
                                    onClick={logout}
                                    className="px-4 py-2 m-2 p-2 shadow-md rounded-md flex items-center gap-3  bg-gray-100 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base">Logout <MdLogout /></p>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header