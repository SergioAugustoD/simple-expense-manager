import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Finances from '../components/Pages/Finances';
import Login from '../components/Pages/User/Login';

import Home from './../components/Pages/Home';
import CreateUser from './../components/Pages/User/CreateUser/index';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/finances' element={<Finances />} />
      <Route path='/login' element={<Login />} />
      <Route path='/createuser' element={<CreateUser />} />
    </Routes>
  );
};
