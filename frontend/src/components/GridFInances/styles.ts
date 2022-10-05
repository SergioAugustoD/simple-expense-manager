import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import styled from "styled-components";

export const DataGridS = styled(DataGrid)`
  .rowGreen {
    background-color: green;
    color: black;
  }
  .rowRed {
  background: red;
  color: black;
}
.colorCell {
  background: lightgray;
}


`;

export const DialogS = styled(Dialog)`
  z-index: 9999;
`;