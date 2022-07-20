import './App.css';
import { Header, CreateContainer, MainContainer, Checkout, Service, About, Chatbot } from "./components"
import { Route, Routes } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useStateValue } from './context/StateProvider';
import { getAllItems } from './utils/firebaseFunctions';
import { useEffect } from 'react';
import { actionType } from './context/reducer';
import DetailProductPage from './components/DetailProductPage';
import SuccessFull from './components/SuccessFull';


function App() {
  const [, dispatch] = useStateValue()

  const fetchData = async() => {
    await getAllItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-16 px-4 md:px-16 py-4 w-full" style={{marginTop:58}}>
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateContainer />} />
            <Route path='/product/:productId' element={<DetailProductPage />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/success' element={<SuccessFull />} />
            <Route path='/about' element={<About />} />
            <Route path='/service' element={<Service />} />
          </Routes>
          {/* <div className='relative'>
            <Chatbot />
          </div> */}
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
