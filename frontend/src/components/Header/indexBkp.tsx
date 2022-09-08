import React from 'react';
import './styles.scss'
import ButtonUtil from '../Button';

const Header = () => {
  return (
    <div className='header-main'>
      <div className="header-main__buttons">
        <ButtonUtil className='btHome' title="Home" onClick={() => console.log('Home')} />
        <ButtonUtil className='btHome' title="Finanças" onClick={() => console.log('Finanças')} />
        <ButtonUtil className='btHome' title="Login" onClick={() => console.log('Login')} />
      </div>
    </div>
  );
};
export default Header;