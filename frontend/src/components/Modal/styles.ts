import styled, { keyframes } from "styled-components";

const animationModal = keyframes`
  0% {
    opacity: 0;
    transform: rotateX(-100deg);
    transform-origin: top;
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
    transform-origin: top;
  
}
`;

export const ModalOverlay = styled.div`
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${animationModal} 1s ease 0s 1 normal forwards;
`;

export const ModalBox = styled.div`
  display: block;
  background: white;
  height: 30%;
  padding: 1rem;
  border-radius: 1rem;
`;