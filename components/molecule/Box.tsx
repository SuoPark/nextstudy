import { ReactNode } from "react";
import styled from "styled-components";
import BoxBody from "../atom/BoxBody";
import BoxHeader from "../atom/BoxHeader";

export interface BoxType {
  title: string;
  children: ReactNode;
}

const StyledDiv = styled.div`
  width: 500px;

  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 8px 10px -5px rgba(58, 53, 65, 0.2),
    0px 16px 24px 2px rgba(58, 53, 65, 0.14),
    0px 6px 30px 5px rgba(58, 53, 65, 0.12);
`;

const Box = ({ title, children }: BoxType) => {
  return (
    <StyledDiv>
      <BoxHeader title={title} />
      <BoxBody>{children}</BoxBody>
    </StyledDiv>
  );
};

export default Box;
