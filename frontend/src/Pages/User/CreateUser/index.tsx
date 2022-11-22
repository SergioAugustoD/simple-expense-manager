import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { useUser } from "../../../hooks/User/useUser";
import { ICreateUser } from "../../../interfaces";
import { ContainerS } from "./styles";
import ButtonUtil from "../../../components/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { ToastNotification } from "../../../components/Utils/ToastNotification";
import { STextField } from "../../../styles/Global";


const CreateUser = () => {

  const navigate = useNavigate();
  const { createUser } = useUser();
  const [dataUser, setDataUser] = useState<ICreateUser>({ name: "", email: "", login: "", password: "" });

  const handleSubmit = useCallback(async () => {
    const data = await createUser(dataUser);
    if (data.user.err) {
      ToastNotification.toastError(data.user.err);
    }
    ToastNotification.toastSuccess(data.user.msg);
    navigate("/");
  }, [navigate, createUser, dataUser]);

  return (
    <>
      <ContainerS maxWidth="xs">
        <Box className='box-main'>
          <STextField placeholder="Nome" onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })} />
          <STextField placeholder="E-mail" onChange={(e) => setDataUser({ ...dataUser, email: e.target.value })} />
          <STextField placeholder="Login" onChange={(e) => setDataUser({ ...dataUser, login: e.target.value })} />
          <STextField placeholder="Senha" type='password' onChange={(e) => setDataUser({ ...dataUser, password: e.target.value })} />
          <ButtonUtil size='medium' variant='contained' endIcon={<SendIcon />} title='Enviar' onClick={handleSubmit} />
        </Box>
      </ContainerS>
    </>

  );
};

export default CreateUser;