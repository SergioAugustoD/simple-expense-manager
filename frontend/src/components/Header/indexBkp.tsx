import React from 'react';
import './styles.scss'
import Button from '../Button';

const Header = () => {
  return (
    <div className='header-main'>
      <div className="header-main__buttons">
        <Button className='btHome' nameButton="Home" onClick={() => console.log('Home')} />
        <Button className='btHome' nameButton="Finanças" onClick={() => console.log('Finanças')} />
        <Button className='btHome' nameButton="Login" onClick={() => console.log('Login')} />
      </div>
    </div>
  );
};
export default Header;