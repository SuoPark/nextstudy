import { AuthContext } from "@/context/AuthContext";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../images/logo.png";

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

type loginInfoType = {
  userName: string | null;
  userEmail: string | null;
};
const Header = () => {
  const auth = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState<loginInfoType>();
  useEffect(() => {
    const item = localStorage.getItem("test_login");
    if (item) {
      const loginData = JSON.parse(item);
      setLoginInfo({
        userName: loginData.userName,
        userEmail: loginData.userEmail,
      });
    }
  }, []);
  return (
    <header>
      <StyledDiv>
        <Link href="/">
          <Image src={logo} alt="logo" width={140} height={49} />
        </Link>
        <div>
          <StyledSpan>WeleCome {loginInfo?.userName}</StyledSpan>
          <Button
            onClick={() => {
              auth.logout();
            }}
          >
            Sign Out
          </Button>
        </div>
      </StyledDiv>
    </header>
  );
};

export default Header;
