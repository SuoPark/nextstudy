import styled from "styled-components";

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
}
const Input = ({ id, name, value, setValue }: Props) => {
  return (
    <StyledInput
      id={id}
      name={name}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    ></StyledInput>
  );
};

export default Input;
