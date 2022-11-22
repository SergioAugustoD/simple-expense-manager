import React from "react";

import { Route, Routes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import Finances from "../Pages/Finances";

import CreateUser from "../Pages/User/CreateUser/index";
import UpdateUser from "../Pages/User/UpdateUser";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Finances />} />
      {/* <Route path='/login' element={<Login />} /> */}
      <Route path='/createuser' element={<CreateUser />} />
      <Route path='/updateuser' element={<UpdateUser />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
