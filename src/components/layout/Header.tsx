import { AuthContext } from "@/context/AuthContext";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../../images/logo.png";

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
  box-shadow: 0px 11px 17px 0px #9393933b;
`;

const StyledSpan = styled.span`
  margin-right: 10px;
  font-weight: bold;
  font-size: 15px;
`;

const Header = () => {
  const auth = useContext(AuthContext);
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
  }, []);
  return (
    <header>
      <StyledDiv>
        <Link href="/">
          <Image src={logo} alt="logo" width={140} height={49} />
        </Link>
        <div>
          <StyledSpan>WelCome {userId}</StyledSpan>
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
