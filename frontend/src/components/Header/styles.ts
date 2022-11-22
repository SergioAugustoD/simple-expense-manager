import { Dialog, DialogActions, DialogContent } from "@mui/material";
import Card from "@mui/material/Card";
import styled from "styled-components";

export const NavBarS = styled.div`
   background-color: #060b26;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a.menu-bars{
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }
`;

export const NavS = styled.nav`
  &.nav-menu{
    background-color: #060b26;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
    z-index: 9999;
  }

  &.nav-menu.active {
    left: 0;
    transition: 350ms;
    z-index: 9999;
}

.nav-text {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  list-style: none;
  height: 60px;

  a {
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;

  &:hover {
    background-color: #1a83ff;
  }
}
}

.nav-menu-items {
  width: 100%;
}

.navbar-toggle {
  background-color: #060b26;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-flex-start;
  align-items: center;

}

span {
  margin-left: 16px;
}

a.menu-bars{
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }
`;

export const CardS = styled(Card)`
  &&{
    background-color: #060b26;
    color: white;
    margin: 5px;
  }

  .text-welcome{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 0px 8px 24px;

    h3 {
      margin-left: 16px;
    }
  }

`;

export const DialogS = styled(Dialog)`
  z-index: 9999;
`;

export const SDialogContent = styled(DialogContent)`
  display: flex;
  width: 340px;
  height: 300px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SDialogActions = styled(DialogActions)`
  display: flex;
  flex-direction: row;
`;