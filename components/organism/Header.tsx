import Image from "next/image";
import Link from "next/link";
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
`;
const Header = () => {
  return (
    <header>
      <StyledDiv>
        <Link href="/">
          <Image src={logo} alt="logo" width={140} height={49} />
        </Link>
        <span>icon</span>
      </StyledDiv>
    </header>
  );
};

export default Header;
