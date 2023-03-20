import styled from "styled-components";

export interface BoxHeaderType {
  title: string;
}

const StyledTitle = styled.h2`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e1e1e1;
`;
const BoxHeader = ({ title }: BoxHeaderType) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default BoxHeader;
