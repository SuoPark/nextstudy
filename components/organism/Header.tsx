import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import logo from "../../images/logo.png";
import Button from "../atom/Button";

const StyledDiv = styled("div")`
  display: flex;
  justify-content: space-between;
  height: 64px;
  width: 100%;
  position: fixed;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: white;
  z-index: 10000;
`;

const StyledSpan = styled.span`
  margin-right: 10px;
  font-weight: bold;
  font-size: 15px;
`;
const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <header>
      <StyledDiv>
        <Link href="/">
          <Image src={logo} alt="logo" width={140} height={49} />
        </Link>
        <div>
          <StyledSpan>WeleCome {auth.user?.userEmail}</StyledSpan>
          <Button
            content="Sign Out"
            width="100px"
            onClick={() => {
              auth.logout();
            }}
          />
        </div>
      </StyledDiv>
    </header>
  );
};

export default Header;
