import { Grid } from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";

import SideLayout from "./SideLayout";

interface LayoutProps {
  children: ReactNode;
}

const LayoutBody = styled("div")`
  display: flex;
  padding-top: 65px;
`;
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <Grid container sx={{ pt: "65px" }} height="100vh">
        <Grid item xs={0} sm={2} sx={{ bgcolor: "#28243e" }}>
          <SideLayout />
        </Grid>
        <Grid item xs={12} sm={10}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};
export default Layout;
