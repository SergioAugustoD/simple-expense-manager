import { Container } from "@mui/material";
import styled from "styled-components";

export const ContainerS = styled(Container)`
  margin-top: 100px;

  .box-main {
    display: flex;
    flex-direction: column;

    .buttons {
      display: flex;
      justify-content: left;
      height: 50px;

      a {
        margin: 0 0 0 15px;
      }
    }
  }
`;