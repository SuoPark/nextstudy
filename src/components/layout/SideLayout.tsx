import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useContext, useEffect } from "react";

import styled from "@emotion/styled";
import { Settings, SettingsContext } from "@/context/SettingContext";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { IMenuItem } from "@/hooks/useAdminInfo";
import Router from "next/router";

const SideLayout = () => {
  const StyledListItem = styled(ListItemButton)({
    backgroundColor: "transparent",
    outline: "0",
    border: "0",
    margin: "0",
    borderRadius: "0",
    padding: "0",
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    flexGrow: "1",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    textDecoration: "none",
    minWidth: "0",
    boxSizing: "border-box",
    textAlign: "left",
    paddingTop: "0.5625rem",
    paddingBottom: "0.5625rem",
    width: "100%",
    color: "rgba(231, 227, 252, 0.87)",
    borderTopRightRadius: "100px",
    borderBottomRightRadius: "100px",
    transition: "padding-left 0.25s ease-in-out",
    paddingLeft: "1.375rem",
    paddingRight: "0.875rem",
  });

  const settings = useContext(SettingsContext);
  const saveSettings = settings.saveSettings;
  const settingsValue = settings.settings;
  const updateSettings = (data: IMenuItem) => {
    if (data.children) {
      const item: Settings = {
        ...settingsValue,
        upperIndex: data.adminMenuNo,
      };
      saveSettings(item);
    } else {
      const item: Settings = {
        ...settingsValue,
        upperIndex: data.upperMenuNo,
        itemIndex: data.adminMenuNo,
      };
      saveSettings(item);
      Router.push(data.menuUrl);
    }
  };
  const auth = useAuth();
  const items = auth.user?.adminMenuList.children || [];

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <List component="nav" aria-label="secondary mailbox folder">
        {items.map((data, i) => {
          return (
            <Box key={i}>
              <StyledListItem
                selected={settingsValue.itemIndex === data.adminMenuNo}
                onClick={() => updateSettings(data)}
                sx={{
                  backgroundImage:
                    settingsValue.itemIndex === data.adminMenuNo
                      ? `linear-gradient(
                  98deg,
                  rgb(255, 140, 144),
                  rgb(255, 76, 81) 94%
                )`
                      : "",
                  boxShadow:
                    settingsValue.itemIndex === data.adminMenuNo
                      ? "rgba(58, 53, 65, 0.42) 0px 4px 8px -4px"
                      : "",
                }}
              >
                <ListItemText primary={data.menuName} />
                {data.children &&
                settingsValue.upperIndex === data.adminMenuNo ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </StyledListItem>
              <Collapse
                in={settingsValue.upperIndex === data.adminMenuNo}
                timeout="auto"
                unmountOnExit
              >
                {data.children?.map((children, i) => {
                  return (
                    <StyledListItem
                      key={i}
                      selected={
                        settingsValue.itemIndex === children.adminMenuNo
                      }
                      onClick={() => updateSettings(children)}
                      sx={{
                        backgroundImage:
                          settingsValue.itemIndex === children.adminMenuNo
                            ? `linear-gradient(
              98deg,
              rgb(255, 140, 144),
              rgb(255, 76, 81) 94%
            )`
                            : "",
                        boxShadow:
                          settingsValue.itemIndex === children.adminMenuNo
                            ? "rgba(58, 53, 65, 0.42) 0px 4px 8px -4px"
                            : "",
                      }}
                    >
                      <ListItemText primary={children.menuName} />
                    </StyledListItem>
                  );
                })}
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

export default SideLayout;
