import { ReactElement } from "react";
import styled from "styled-components";
import ListItem, { ListItemType } from "../atom/ListItem";

interface propsType {
  items: ListItemType[];
}

const StyledUL = styled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-top: 0rem;
  transition: padding 0.25s ease;
  padding-right: 1.125rem;
`;

const ListMenu = ({ items }: propsType) => {
  return (
    <StyledUL>
      {items.map((item) => {
        return (
          <ListItem
            key={item.index}
            index={item.index}
            content={item.content}
            icon={item.icon}
          ></ListItem>
        );
      })}
    </StyledUL>
  );
};

export default ListMenu;
