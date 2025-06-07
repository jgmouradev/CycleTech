import React from 'react'
import Header from './components/Header'
import BikeCarousel from './components/BikeCarousel'



const App: React.FC = () => {
  return (
    <div>
      <Header/>
       <BikeCarousel 
        autoPlayInterval={5000}/>

     
    </div>
  );
};

export default App;