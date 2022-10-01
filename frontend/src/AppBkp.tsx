import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/Footer";
import GlobalStyles from "./styles";


function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles />
      < BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;