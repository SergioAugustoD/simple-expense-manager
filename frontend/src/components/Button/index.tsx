import React from "react";
import Button from "@mui/material/Button";
import "./styles.scss";
import { ButtonProps } from "@mui/material";

const ButtonUtil = (props: ButtonProps) => {
  return (
    <Button
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
    </Button>
  );
};
export default ButtonUtil;