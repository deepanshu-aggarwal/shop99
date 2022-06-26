import './App.css';
import { Header, CreateContainer, MainContainer } from "./components"
import { Route, Routes } from "react-router-dom"
import { AnimatePresence } from "framer-motion"


function App() {
  return (
    <AnimatePresence>

      <div className="w-screen h-screen flex flex-col">
        <Header />
        <main className="mt-24 pd-8 w-full" >
          <Routes>
            <Route path='/' element={<MainContainer />}> </Route>
            <Route path='/createItem' element={<CreateContainer />}> </Route>
          </Routes>
        </main>
      </div>
    
    </AnimatePresence>
  );
}

export default App;
