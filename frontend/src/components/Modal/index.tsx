import { Stack } from "@mui/system";
import React, { ReactNode } from "react";
import { ModalBox, ModalOverlay } from "./styles";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <ModalOverlay onClick={props.toggle}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <div className="main-inputs">
              <Stack spacing={2}>
                {props.children}
              </Stack>
            </div>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
}
