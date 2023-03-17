import { ReactNode } from "react";
import styled from "styled-components";
import Header from "../organism/Header";
import SideMenu from "../organism/SideMenu";

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
      <LayoutBody>
        <SideMenu />
        {children}
      </LayoutBody>
    </div>
  );
};
export default Layout;
