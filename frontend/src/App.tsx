import React from "react";

import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <>
      <CssBaseline />
      < BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;