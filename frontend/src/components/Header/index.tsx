import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth/AuthContext";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import ButtonsMenu from "./SliderData";
import { IconContext } from "react-icons";
import { Divider } from "@mui/material";
import { UserService } from "../../services/User/UserService";
import { CardS, NavBarS, NavS } from "./styles";

function Navbar() {
  const auth = useContext(AuthContext);
  const [sidebar, setSidebar] = useState(false);
  const [name, setName] = useState<any>();

  const showSidebar = () => setSidebar(!sidebar);

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
            <ButtonsMenu
              icon={<AiIcons.AiFillMoneyCollect />}
              className='nav-text'
              path='/finances'
              title='Finances'
            />
            {auth.user
              ?
              <ButtonsMenu
                icon={<AiIcons.AiOutlineLogout />}
                className='nav-text'
                path='/login'
                title='Logout'
                onClick={auth.signout}
              />

              : <ButtonsMenu
                icon={<AiIcons.AiOutlineLogin />}
                className='nav-text'
                path='/login'
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
