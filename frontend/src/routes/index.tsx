import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Finances from '../components/Pages/Finances';
import Login from '../components/Pages/Login';

import Home from './../components/Pages/Home';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/finances' element={<Finances />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};
