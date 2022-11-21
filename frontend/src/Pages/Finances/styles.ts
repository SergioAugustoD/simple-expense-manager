import styled from "styled-components";

interface PropsCards {
  backgroundColor: string;
}

export const FinancesContent = styled.div`
  display: flex;
  flex-direction: column;

  .buttons-main {
    display: flex;
    justify-content: space-between;
    margin: 5px;

    button {
      height: 40px;
    }
  }
  .grid-data {
    margin-top: -20px;
  }
`;

export const InfoNotLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CardS = styled.div<PropsCards>`
  &&{
    display: flex;
    padding: 5px;
    background-color: ${p => p.backgroundColor};
    color: white;
    z-index: 999;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 150px;
    flex-direction: column;

    @media (max-width: 665px) {
      width: 100px;
      font-size: 12px;
    }
  }
 
`;

export const StackS = styled.div`
  display: flex;
  gap: 10px;
`;

export const H2Total = styled.h3`
 &.positiveTotal {
  color: green;
}

&.negativeTotal {
  color: red;
}
`;