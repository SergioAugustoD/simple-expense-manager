import React from 'react';
import './styles.scss'

interface Props {
  className: string;
  nameButton: string;
  onClick: () => void;
}

const Button = (props: Props) => {
  return (
    <button type='button' className={props.className} onClick={props.onClick}>{props.nameButton}</button>
  );
};
export default Button;