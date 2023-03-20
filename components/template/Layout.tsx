import { AuthContext } from "@/context/AuthContext";
import { ReactNode, useContext } from "react";
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
  const auth = useContext(AuthContext);
  console.log(auth);
  console.log(auth.user);
  if (auth.user) {
    return (
      <div>
        <Header />
        <LayoutBody>
          <SideMenu />
          {children}
        </LayoutBody>
      </div>
    );
  }
  return <div>{children}</div>;
};
export default Layout;
