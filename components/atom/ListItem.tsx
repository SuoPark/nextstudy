import {
  Settings,
  SettingsConsumer,
  SettingsContext,
} from "@/context/SettingContext";
import { useContext } from "react";
import styled from "styled-components";

export interface ListItemType {
  index: number;
  content: string;
  icon?: ImageData | "";
}

const StyledLI = styled("li").attrs((props) => {
  active: false;
})`
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
  ${(props) =>
    props.active &&
    `&,
    &:hover {
      box-shadow: rgba(58, 53, 65, 0.42) 0px 4px 8px -4px;
      background-image: linear-gradient(
        98deg,
        rgb(255, 140, 144),
        rgb(255, 76, 81) 94%
      );
    }
    
`}
`;

const ListItem = ({ index, content, icon }: ListItemType) => {
  const settings = useContext(SettingsContext);
  const saveSettings = settings.saveSettings;
  const itemName = "item" + index;

  const updateSettings = () => {
    const item: Settings = { item: itemName };
    saveSettings(item);
  };

  return (
    <StyledLI
      id={"item" + index}
      active={itemName === settings.settings.item}
      onClick={() => updateSettings()}
    >
      <>
        {icon}
        {content}
      </>
    </StyledLI>
  );
};

export default ListItem;
