import React from 'react'
import Header from './components/Header'
import BikeCarousel from './components/BikeCarousel'
import ProductCatalog from './components/ProductCatalog';



const App: React.FC = () => {
  return (
    <div>
      <Header/>
       <BikeCarousel 
        autoPlayInterval={5000}/>
        <ProductCatalog/>
   </div>
   
  );
};

export default App;