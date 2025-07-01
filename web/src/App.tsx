import React from 'react'
import Header, { CartProvider } from './components/Header'
import BikeCarousel from './components/BikeCarousel'
import Footer from './components/footer';
import { Routes,Route } from 'react-router-dom';

import Home from './pages/Home';
import { About } from './pages/About';
import  Bicycles  from './pages/Bicycles'
import  Accessories  from './pages/Accessories';
import SalesProducts from './pages/SalesProducts';
import { Contact } from './pages/Contact';
import CheckOut from '../src/components/carrinho/Checkout'
import Login from '../src/components/login/login'



const App: React.FC = () => {
  return (
    <div>
      <CartProvider>
      <Header/>
      
       <BikeCarousel 
        autoPlayInterval={5000}/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/bicycles" element={<Bicycles />} />
        <Route path="/acessories" element={<Accessories/>} />
        <Route path="/SalesProducts" element={<SalesProducts/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/checkout" element={<CheckOut/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
        <Footer/>
        </CartProvider>
   </div>
   
  );
};

export default App;