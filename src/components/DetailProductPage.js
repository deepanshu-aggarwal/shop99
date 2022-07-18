import React from 'react'
import { useParams } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider'
import { motion } from 'framer-motion'
import { FaRupeeSign, FaStar } from 'react-icons/fa';
import { actionType } from '../context/reducer';

const DetailProductPage = () => {
    const [{foodItems, cartItems}, dispatch] = useStateValue();
    const params = useParams()
    const product = foodItems?.find((item) => item.id === params.productId)

    const addToCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [...cartItems, product]
        })
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }

    return (
        <div className='w-full flex flex-row gap-20 justify-center items-center h-screen -mt-[5rem] flex-wrap'>
            <div className='h-96 w-96 border rounded-lg mt-2 p-4'>
                <motion.div
                    className="h-full w-full drop-shadow-2xl"
                    whileHover={{ scale: 1.2 }}
                >
                <img
                    src={product?.imageURL}
                    className='h-full w-full object-contain' 
                    alt={product?.title} 
                />
                </motion.div>
            </div>
            <div className='justify-center flex flex-col gap-3 max-w-lg'>
                <h1 className='font-bold text-4xl text-gray-600'>{product?.title}</h1>
                <div className='flex items-center text-3xl text-orange-500'>
                    <FaRupeeSign/>
                    {product?.price}
                </div>
                <h2 className='capitalize text-textColor'>
                    <span className='font-bold'>Category </span> 
                    {product?.category}
                </h2>
                <h3 className='capitalize'>
                    <span className='font-bold'>Description:</span> {product?.description}
                </h3>
                <div className='border-2 border-orange-500 p-0.5 w-14 flex justify-center items-center rounded-full gap-1'>
                    {product?.rating}
                    <FaStar className='text-orange-500' />
                </div>
                <div className='border-2 border-orange-500 p-0.5 w-32 flex flex-col items-center rounded-full text-textColor'>{product?.calories} calories</div>
                <div className='border-2 border-orange-500 p-0.5 w-32 flex flex-col items-center rounded-full text-textColor'>{product?.weight} grams</div>
                <button 
                    className='border p-2 bg-orange-500 rounded-lg mt-4 text-white font-semibold'
                    onClick={addToCart}
                >
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default DetailProductPage