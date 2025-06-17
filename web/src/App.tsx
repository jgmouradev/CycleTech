import React from 'react'
import Header from './components/Header'
import BikeCarousel from './components/BikeCarousel'
import Footer from './components/footer';
import { Routes,Route } from 'react-router-dom';

import Home from './pages/Home';
import { About } from './pages/about';
import { Bicycles } from './pages/Bicycles'
import { Acessories } from './pages/acessories';
import SalesProducts from './pages/SalesProducts';
import { Contact } from './pages/Contact';



const App: React.FC = () => {
  return (
    <div>
      <Header/>
      
       <BikeCarousel 
        autoPlayInterval={5000}/>
        <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/bicycles" element={<Bicycles />} />
        <Route path="/acessories" element={<Acessories/>} />
        <Route path="/SalesProducts" element={<SalesProducts/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
        <Footer/>
   </div>
   
  );
};

export default App;