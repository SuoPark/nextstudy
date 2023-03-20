import { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: rgb(13, 110, 253);
  color: white;
  font-size: larger;
  padding: 5px;
  border-radius: 5px;
`;

interface ButtonType {
  content: string;
  onClick?: () => void;
  width?: string;
}

const Button = ({ content, onClick, width = "100%" }: ButtonType) => {
  return (
    <StyledButton onClick={onClick} style={{ width: width }}>
      {content}
    </StyledButton>
  );
};

export default Button;
