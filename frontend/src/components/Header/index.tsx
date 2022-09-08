import React, { useState, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ButtonsMenu from './SliderData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { AuthContext } from '../../context/Auth/AuthContext';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const auth = useContext(AuthContext);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
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
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
