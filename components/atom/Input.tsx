import { HTMLInputTypeAttribute } from "react";
import { text } from "stream/consumers";
import styled from "styled-components";
import { InputType } from "zlib";

const StyledInput = styled.input`
  border-radius: 5px;
  border: 1px solid #999999;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  :focus {
    border: 2px solid #9f93ff;
    background-color: #f8f8f8c5;
    outline: none;
  }
`;

interface Props {
  id: string;
  name?: string;
  value: string;
  setValue: (value: string) => void | null;
  type?: HTMLInputTypeAttribute;
}
const Input = ({ id, name, value, setValue, type = "text" }: Props) => {
  return (
    <StyledInput
      id={id}
      name={name}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type={type}
      value={value}
    ></StyledInput>
  );
};

export default Input;
