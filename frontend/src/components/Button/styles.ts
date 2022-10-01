import styled from "styled-components";
import Button from "@mui/material/Button";

export const ButtonS = styled(Button)`
  
  &.bt-add {
    background-color: #060b26;
    color: white;

    &:hover {
      background-color: none;
    }
  }

 &.button-default {
  background-color: #060b26;
  height: 35px;
  border: none;
  border-radius: 8px;
  color: white;
  margin: 0 0 0 5px;
} 
`;