import React from "react";
import { ButtonProps } from "@mui/material";
import { ButtonS } from "./styles";

const ButtonUtil = (props: ButtonProps) => {
  return (
    <ButtonS
      className={props.className ? props.className : "button-default"}
      variant={props.variant}
      onClick={props.onClick}
      color={props.color}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      size={props.size}
      fullWidth={props.fullWidth}
    >
      {props.title}
    </ButtonS>
  );
};
export default ButtonUtil;