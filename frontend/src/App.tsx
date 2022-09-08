import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import { AuthProvider } from './context/Auth/AuthProvider';
import { AppRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
      <AuthProvider>
        < BrowserRouter>
          <Header />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App