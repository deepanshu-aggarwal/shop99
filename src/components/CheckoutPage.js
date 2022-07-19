import React, { useState } from 'react'
import { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { Navigate } from 'react-router-dom'
import {actionType} from '../context/reducer'

const CheckoutPage = () => {
  const [{ user }, dispatch] = useStateValue();

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    AddressLine1: '',
    AddressLine2: '',
    city: '',
    state: 'Andhra pradesh',
    zip: '',
    phone: '',
    delivery: '',
    amount: '',
  })
  const [cart, setCart] = useState([])
  const [navigate, setNavigate] = useState(false)


  const handleChange = (e) => {
    let { name, value } = e.target;
    switch (name) {
      case 'firstName': {
        setState({ ...state, firstName: value })
        break;
      }
      case 'lastName': {
        setState({ ...state, lastName: value })
        break;
      }
      case 'AddressLine1': {
        setState({ ...state, AddressLine1: value })
        break;
      }
      case 'AddressLine2': {
        setState({ ...state, AddressLine2: value })
        break;
      }
      case 'city': {
        setState({ ...state, city: value })
        break;
      }
      case 'state': {
        setState({ ...state, state: value })
        break;
      }
      case 'zip': {
        setState({ ...state, zip: value })
        break;
      }
      case 'phone': {
        setState({ ...state, phone: value })
        break;
      }
      case 'delivery': {
        setState({ ...state, delivery: value })
        break;
      }

      default:
        break;
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.firstName || !state.lastName || !state.AddressLine1 || !state.city || !state.state || !state.zip || !state.phone || !state.delivery) {
      alert('Please fill out all fields')
      return;
    }
    if (state.delivery === 'razor') {
      displayRazor(state.amount)
    }
    else {
      alert('Payement Successful')
      const orderid  = Math.floor(Math.random() * 1000000)
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: []
      })
      localStorage.setItem('cartItems', JSON.stringify([]))
      localStorage.setItem('orderId', JSON.stringify(orderid))
      setNavigate(true)
    }
  }

  const displayRazor = async (e) => {
    if (state.amount === '') {
      alert('Please enter amount')
      return;
    }

    const options = {
      key: 'rzp_test_WhZ3WhzykYx7hr',
      amount: state.amount * 100,
      currency: 'INR',
      name: 'Shopp99',
      description: 'Payment for your order',
      handler: function (response) {
        const orderid  = Math.floor(Math.random() * 1000000)
        dispatch({
          type: actionType.SET_CART_ITEMS,
          cartItems: []
        })
        localStorage.setItem('cartItems', JSON.stringify([]))
        localStorage.setItem('orderId', JSON.stringify(orderid))
        setNavigate(true)
      },
      prefill: {
        name: state.firstName,
        email: user?.email,
        contact: state.phone,
      },
      notes: {
        address: state.AddressLine1,
      },
      theme: {
        color: '#F37254',
      }
    };

    var pay = new window.Razorpay(options);
    pay.open();

    setTimeout(() => {

      localStorage.setItem('cartItem', JSON.stringify([]))
      setNavigate(true)
    }, 8000)
  }

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cartItems')))
  }, [])

  useEffect(() => {
    const total = cart.reduce((acc, curr) => acc + parseInt(curr.price) * curr?.qty, 0)
    setState({ ...state, amount: total })
  }, [cart])

  return (
    <div className='w-full h-screen flex md:justify-around items-start mt-2'>
      {
        navigate && <Navigate to="/success" />
      }

      <div className='md:w-[60%] w-full '>
        <h1 className='text-headingColor text-4xl font-semibold mb-3'>Enter Your Address</h1>
        <p className='text-textColor text-sm mb-3'>The Items will be delivered to the given address and can be changed</p>
        <form className="w-full max-w-lg mt-2 border rounded-md p-3" >
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                First Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name='firstName' id="grid-first-name" type="text" placeholder="Jane" required onChange={handleChange} />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Last Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" name='lastName' placeholder="Doe" onChange={handleChange} required />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                Phone Number
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone" name='phone' type="text" required onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address1">
                Address Line 1
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address1" name='AddressLine1' type="text" required onChange={handleChange} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address2">
                Address Line 2
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address2" name='AddressLine2' type="text" required onChange={handleChange} placeholder="" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                City
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" name='city' type="text" placeholder="Delhi" onChange={handleChange} />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state" onChange={handleChange}>
                State
              </label>
              <div className="relative" >
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='state' id="grid-state" onChange={handleChange}>
                  <option >Andhra Pradesh</option>
                  <option >Arunachal Pradesh</option>
                  <option >Assam</option>
                  <option >Bihar</option>
                  <option >Chandigarh</option>
                  <option >Chhattisgarh</option>
                  <option >Dadra and Nagar Haveli</option>
                  <option >Daman and Diu</option>
                  <option >Delhi</option>
                  <option >Goa</option>
                  <option >Gujarat</option>
                  <option >Haryana</option>
                  <option >Himachal Pradesh</option>
                  <option >Jammu and Kashmir</option>
                  <option >Jharkhand</option>
                  <option >Karnataka</option>
                  <option >Kerala</option>
                  <option >Ladakh</option>
                  <option >Lakshadweep</option>
                  <option >Madhya Pradesh</option>
                  <option >Maharashtra</option>
                  <option >Manipur</option>
                  <option >Meghalaya</option>
                  <option >Mizoram</option>
                  <option >Nagaland</option>
                  <option >Odisha</option>
                  <option >Puducherry</option>
                  <option >Punjab</option>
                  <option >Rajasthan</option>
                  <option >Sikkim</option>
                  <option >Tamil Nadu</option>
                  <option >Telangana</option>
                  <option >Tripura</option>
                  <option >Uttar Pradesh</option>
                  <option >Uttarakhand</option>
                  <option >West Bengal</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                Zip
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" name='zip' placeholder="560001" onChange={handleChange} />
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className="w-full px-3 mt-6 mb-3 h-11 rounded-md flex items-center justify-start bg-gray-200 w-[48%]">
              <input type="radio" id='cod' placeholder='COD' name='delivery' onChange={handleChange} value='cod' />
              <label htmlFor="cod" className="block uppercase tracking-wide text-gray-700 mt-2 ml-6 text-xs font-bold mb-2 w-full">Cash on Delivery</label>
            </div>
            <div className="w-full px-3 mt-6 mb-3 h-11 rounded-md flex items-center justify-start bg-gray-200 w-[48%]">
              <input type="radio" id='razor' name='delivery' onChange={handleChange} value='razor' />
              <label htmlFor="razor" className="block uppercase tracking-wide text-gray-700 mt-2 ml-6 text-xs font-bold mb-2 w-full">Razor Pay</label>
            </div>
          </div>
          <button className='w-full mt-2 border rounded-md  py-3 px-4 text-white bg-orange-400' onClick={handleSubmit}>Place your Order</button>
        </form>

      </div>
      <div className='w-[35%] hidden lg:flex flex-col items-start justify-start p-2 relative top-[2.5rem]'>
        <h3 className='text-textColor text-lg font-bold'>Your Items in cart</h3>
        <div className='w-full flex flex-col items-start justify-start'>
          {
            cart.map(item => (
              <div className='w-[80%] flex justify-between items-center border rounded-md p-2 mt-2 h-[5rem]' key={item?.id}>
                <div className='flex justify-between items-center '>
                  <img src={item?.imageURL} alt="prodImg" className='w-9' />
                  <div className='flex flex-col ml-3'>
                    <h3 className='text-base text-textColor '>{item?.title}</h3>
                    <p>{item?.weight}</p>
                  </div>
                </div>
                <h4 className='font-bold ml-5 relative'>₹ {item?.price}</h4>
              </div>
            ))
          }
        </div>

        <div className='w-[80%] border rounded-md text-textColor flex justify-center mt-3'>
          <h3>Your Total bill is of <span className='font-bold'>₹ {state.amount}</span></h3>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage