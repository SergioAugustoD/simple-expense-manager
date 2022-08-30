import React from 'react';
import './App.scss';
import Footer from './components/Footer';
import GridFinances from './components/GridFInances';
import Header from './components/Header';


function App() {
  return (
    <div>
      <Header />
      <GridFinances />
      <Footer />
    </div>
  )
}

export default App