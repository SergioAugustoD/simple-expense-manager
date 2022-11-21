import styled from "styled-components";
import Button from "@mui/material/Button";

export const ButtonS = styled(Button)`
    &&{
      :hover {
        background-color: rgba(215, 207, 211, 0.8);
      }
      @media (max-width: 665px) {
      width: 90px;
      font-size: 10px;
    }
    }

  &.bt-add {
    background-color: #060b26;
    color: white;
  }

  &.bt-remove {
    background-color: red;
    color: white;
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