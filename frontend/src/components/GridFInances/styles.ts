import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

export const DataGridS = styled(DataGrid)`
  .rowGreen {
    background-color: rgb(26, 114, 26);
    color: black;
  }
  .rowRed {
  background: rgb(216, 94, 94);
  color: black;
}
`;

export const H2Total = styled.h2`
 &.positiveTotal {
  color: green;
}

&.negativeTotal {
  color: red;
}
`;