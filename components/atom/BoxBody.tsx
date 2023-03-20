import { ReactNode } from "react";
import styled from "styled-components";

export interface BoxBodyType {
  children: ReactNode;
}

const StyledDiv = styled.div`
  height: 200px;
  padding: 15px;
`;

const BoxBody = ({ children }: BoxBodyType) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default BoxBody;
