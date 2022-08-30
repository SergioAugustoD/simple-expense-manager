import React from 'react';
import './styles.scss'
import Button from '../Button';

const Header = () => {
  return (
    <div className='header-main'>
      <Button className='btHome' nameButton="Home" onClick={() => console.log('teste')} />
    </div>
  );
};
export default Header;