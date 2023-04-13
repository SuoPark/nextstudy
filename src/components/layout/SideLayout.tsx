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
import Router, { useRouter } from "next/router";
import { useQuery } from "react-query";

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
  const router = useRouter();
  const { asPath } = router;
  const settings = useContext(SettingsContext);
  const saveSettings = settings.saveSettings;
  const settingsValue = settings.settings;
  const auth = useAuth();
  const items = auth.user?.adminMenuList.children || [];
  const updateSettings = (data: IMenuItem) => {
    if (data.children) {
      const item: Settings = {
        ...settingsValue,
        upperIndex: data.adminMenuNo,
      };
      console.log(1);
      saveSettings(item);
    } else {
      console.log(2);
      const item: Settings = {
        ...settingsValue,
        upperIndex: data.upperMenuNo,
      };
      saveSettings(item);
      Router.push(data.menuUrl);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <List component="nav" aria-label="secondary mailbox folder">
        {items.map((data, i) => {
          return (
            <Box key={i}>
              <StyledListItem
                selected={asPath === data.menuUrl}
                onClick={() => updateSettings(data)}
                sx={{
                  backgroundImage:
                    asPath === data.menuUrl
                      ? `linear-gradient(
                  98deg,
                  rgb(255, 140, 144),
                  rgb(255, 76, 81) 94%
                )`
                      : "",
                  boxShadow:
                    asPath === data.menuUrl
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
                      selected={asPath === children.menuUrl}
                      onClick={() => updateSettings(children)}
                      sx={{
                        backgroundImage:
                          asPath === children.menuUrl
                            ? `linear-gradient(
              98deg,
              rgb(255, 140, 144),
              rgb(255, 76, 81) 94%
            )`
                            : "",
                        boxShadow:
                          asPath === children.menuUrl
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
