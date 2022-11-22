import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ButtonsMenu from "./SliderData";
import { IconContext } from "react-icons";
import { Divider } from "@mui/material";
import { UserService } from "../../services/User/UserService";
import { CardS, NavBarS, NavS, SDialogActions, SDialogContent } from "./styles";
import { DialogS } from "./styles";
import ButtonUtil from "../Button";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SendAltIcon from "@mui/icons-material/Send";
import { STextField } from "../../styles/Global";
import { IUser } from "../../interfaces/User/IUser";
import { ToastNotification } from "../Utils/ToastNotification";

function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [name, setName] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [dataLogin, setDataLogin] = useState<IUser>({ login: "", password: "" });

  const showSidebar = () => setSidebar(!sidebar);
  const handleClose = () => {
    setOpen(false);
  };
  const handleNavigateCreateUser = () => {
    setOpen(false);
    return navigate("/createuser");
  };
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
        setOpen(false);
      }
    }
  }, [navigate, auth, dataLogin]);
  useEffect(() => {
    async function getName() {
      if (localStorage.getItem("id_user")) {
        const getUserName = await UserService.getName(localStorage.getItem("id_user"));

        if (getUserName) {
          setName(getUserName.data);
        }
      }

    }
    getName();
  }, [auth.user]);

  return (
    <>
      <DialogS
        open={open}
        onClose={handleClose}
      >
        <SDialogContent>
          <STextField
            placeholder="Usuário"
            onChange={(e) => setDataLogin({ ...dataLogin, login: e.target.value })} />
          <STextField
            placeholder="Senha"
            type='password'
            onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
          <SDialogActions>
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
              onClick={handleNavigateCreateUser} />
          </SDialogActions>
        </SDialogContent>
      </DialogS>
      <IconContext.Provider value={{ color: "#fff" }}>
        <NavBarS>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </NavBarS>
        <NavS className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <CardS>
              <Divider />
              {auth.user &&
                <>
                  <ButtonsMenu
                    icon={<AiIcons.AiOutlineUser size={30} />}
                    className='nav-text'
                    path='/updateuser'
                    title={`${name.nameUser}`}
                  />
                </>
              }
            </CardS>
            <ButtonsMenu
              icon={<AiIcons.AiFillHome />}
              className='nav-text'
              path='/'
              title='Home'
            />
            {auth.user
              ?
              <ButtonsMenu
                icon={<AiIcons.AiOutlineLogout />}
                className='nav-text'
                path='/'
                title='Logout'
                onClick={auth.signout}
              />

              : <ButtonsMenu
                icon={<AiIcons.AiOutlineLogin />}
                className='nav-text'
                onClick={() => setOpen(true)}
                title='Login'
              />
            }
          </ul>
        </NavS>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
