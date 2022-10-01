import React, { useCallback, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { IUser } from "../../../interfaces/User/IUser";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ButtonUtil from "../../../components/Button/index";
import { Box, Container, Link } from "@mui/material";
import { ContainerS } from "../CreateUser/styles";
import { ToastNotification } from "../../../components/Utils/ToastNotification";


const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [dataLogin, setDataLogin] = useState<IUser>({ login: "", password: "" });

  const handleSubmit = useCallback(async () => {
    if (dataLogin.login === "") {
      ToastNotification.toastError("Informe o login!");
    }

    if (dataLogin.password === "") {
      ToastNotification.toastError("Informe sua senha!");
    }

    if (dataLogin.login && dataLogin.password) {
      const login = await auth.signin(dataLogin);
      if (!login.err) {
        navigate("/");
      }
    }
  }, [navigate, auth, dataLogin]);

  return (
    <>
      <ContainerS maxWidth="xs">
        <Box className='box-main'>
          <TextField margin='dense' label="Login" variant="outlined" onChange={(e) => setDataLogin({ ...dataLogin, login: e.target.value })} />
          <TextField type='password' margin='dense' label="Password" variant="outlined" onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
          <div className="buttons">
            <ButtonUtil size='medium' variant='contained' color='primary' title='Login' endIcon={<PersonAddAltIcon />} onClick={handleSubmit} />
            <Link underline='hover' onClick={() => navigate("/createuser")} variant='inherit'>Ainda não é usuário ? Clique aqui para cadastrar!</Link>
          </div>
        </Box>
      </ContainerS>
    </>
  );
};

export default Login;