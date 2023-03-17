import styled from "styled-components";

export interface ListItemType {
  index: number;
  content: string;
  icon?: ImageData | "";
}

const StyledLI = styled("li")`
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  flex-grow: 1;
  -webkit-box-pack: start;
  justify-content: flex-start;

  -webkit-box-align: center;

  align-items: center;
  position: relative;
  text-decoration: none;
  min-width: 0;
  box-sizing: border-box;
  text-align: left;
  padding-top: 0.5625rem;
  padding-bottom: 0.5625rem;
  width: 100%;
  color: rgba(231, 227, 252, 0.87);
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;

  transition: padding-left 0.25s ease-in-out;
  padding-left: 1.375rem;
  padding-right: 0.875rem;
`;

const ListItem = ({ index, content, icon }: ListItemType) => {
  return (
    <StyledLI id={"item" + index}>
      <>
        {icon}
        {content}
      </>
    </StyledLI>
  );
};

export default ListItem;
