import styled from "styled-components";

export const STextField = styled.input`
     padding: 5px;
     font-size: 16px;
     border-width: 0px;
     border-color: #CCCCCC;
     background-color: #FFFFFF;
     color: #000000;
     border-style: hidden;
     border-radius: 7px;
     box-shadow: 0px 0px 5px rgba(66,66,66,.75);
     margin: 5px;
     width: 255px;
     height: 40px;

     &:focus {
      outline:none;
     }
`;