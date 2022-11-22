import React from "react";
import { IconBaseProps } from "react-icons";
import { Link } from "react-router-dom";

interface PropsButtonsMenu {
  className?: string;
  path?: string;
  icon: IconBaseProps;
  title: string;
  onClick?: () => void;
}

const ButtonsMenu = (props: PropsButtonsMenu) => {

  return (
    <li className={props.className}>
      <Link to={props.path} onClick={props.onClick}>
        <>
          {props.icon}
          <span>{props.title}</span>
        </>
      </Link>
    </li>
  );
};

export default ButtonsMenu;
