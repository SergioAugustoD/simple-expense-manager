import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "../../../hooks/User/useUser";
import { ContainerS } from "./styles";
import ButtonUtil from "../../../components/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { ToastNotification } from "../../../components/Utils/ToastNotification";
import { IUpdateUser } from "../../../interfaces/User/IUpdateUser";
import { UserService } from "../../../services/User/UserService";


const UpdateUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const [dataUser, setDataUser] = useState<IUpdateUser>({ id: localStorage.getItem("id_user"), name: "", email: "", oldPassword: "", newPassword: "" });
  const [dataInfo, setDataInfo] = useState<any>();

  const handleSubmit = useCallback(async () => {
    const data = await updateUser(dataUser);
    if (data.user.err) {
      ToastNotification.toastError(data.user.err);
    }
    ToastNotification.toastSuccess(data.user.msg);
    window.location.reload();
  }, [navigate, updateUser, dataUser]);

  useEffect(() => {
    async function getInfo() {
      if (localStorage.getItem("id_user")) {
        const getInfoUser = await UserService.getInfoUser(localStorage.getItem("id_user"));

        if (getInfoUser.data)
          setDataInfo(getInfoUser.data);
        setIsLoading(false);
      }
    }
    getInfo();
  }, []);
  if (isLoading)
    return <CircularProgress />;

  return (
    <>
      <ContainerS maxWidth="xs">
        <Box className='box-main'>
          <TextField margin='dense' variant="outlined" placeholder={dataInfo.name} onChange={(e) => setDataUser({ ...dataUser, name: e.target.value ? e.target.value : dataInfo.name })} />
          <TextField margin='dense' variant="outlined" placeholder={dataInfo.email} onChange={(e) => setDataUser({ ...dataUser, email: e.target.value ? e.target.value : dataInfo.email })} />
          <TextField margin='dense' label="Senha antiga" variant="outlined" type='password' onChange={(e) => setDataUser({ ...dataUser, oldPassword: e.target.value })} />
          <TextField margin='dense' label="Senha nova" variant="outlined" type='password' onChange={(e) => setDataUser({ ...dataUser, newPassword: e.target.value })} />
          <ButtonUtil size='medium' variant='contained' endIcon={<SendIcon />} title='Enviar' onClick={handleSubmit} />
        </Box>
      </ContainerS>
    </>

  );
};

export default UpdateUser;