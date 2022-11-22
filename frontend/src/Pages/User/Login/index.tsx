import React, { useCallback, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { IUser } from "../../../interfaces/User/IUser";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SendAltIcon from "@mui/icons-material/Send";
import ButtonUtil from "../../../components/Button/index";
import { Box } from "@mui/material";
import { ContainerS } from "./styles";
import { ToastNotification } from "../../../components/Utils/ToastNotification";
import { STextField } from "../../../styles/Global";


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
          <STextField
            placeholder="Usuário"
            onChange={(e) => setDataLogin({ ...dataLogin, login: e.target.value })} />
          <STextField
            placeholder="Senha"
            type='password'
            onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
          <div className="buttons">
            <ButtonUtil
              size='medium'
              variant='contained'
              color='primary'
              title='Logar'
              endIcon={<SendAltIcon />}
              onClick={handleSubmit} />
            <ButtonUtil
              size='medium'
              variant='contained'
              color='primary'
              title='Cadastrar'
              endIcon={<PersonAddAltIcon />}
              onClick={() => navigate("/createuser")} />
          </div>
        </Box>
      </ContainerS>
    </>
  );
};

export default Login;