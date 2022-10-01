import React from "react";
import { FooterS } from "./styles";
import * as BsIcons from "react-icons/bs";

const Footer = () => {
  return (
    <FooterS >
      <h5>Desenvolvido por @SergioAugustoD  </h5><a href="https://github.com/SergioAugustoD" target="_blank" rel="noreferrer"><BsIcons.BsGithub color="white" size='1.2em' /></a>
    </FooterS>
  );
};
export default Footer;