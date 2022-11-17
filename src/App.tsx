
import Home from './pages/Home';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'




const App : React.FC = () => {
  return (

   <BrowserRouter>
   <Routes>
   <Route path="/wordleclone" element={<Home/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App;
