import './App.css';
import { Header, CreateContainer, MainContainer } from "./components"
import { Route, Routes } from "react-router-dom"
import { AnimatePresence } from "framer-motion"


function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-16 px-4 md:px-16 py-4 w-full" style={{marginTop:58}}>
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
