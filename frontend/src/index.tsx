import React from "react";
import { AuthProvider } from "./context/Auth/AuthProvider";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { CssBaseline } from "@mui/material";
import GlobalStyles from "./styles";
import { BrowserRouter } from "react-router-dom";
import Header from "../src/components/Header";
import { AppRoutes } from "./routes";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
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
    </AuthProvider>
  </React.StrictMode>
);

