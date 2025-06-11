import React from 'react'
import Header from './components/Header'
import BikeCarousel from './components/BikeCarousel'
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/footer';



const App: React.FC = () => {
  return (
    <div>
      <Header/>
       <BikeCarousel 
        autoPlayInterval={5000}/>
        <ProductCatalog/>
        <Footer/>
   </div>
   
  );
};

export default App;