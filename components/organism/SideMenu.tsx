import Link from "next/link";
import styled from "styled-components";
import sampleData from "../../sampleData";
import ListMenu from "../molecule/ListMenu";

const StyledDiv = styled("div")`
  background-color: #28243e;
  box-shadow: 0px 8px 10px -5px rgba(58, 53, 65, 0.2),
    0px 16px 24px 2px rgba(58, 53, 65, 0.14),
    0px 6px 30px 5px rgba(58, 53, 65, 0.12);

  width: 260px;
`;
const SideMenu = () => {
  return (
    <>
      <StyledDiv>
        <ListMenu items={sampleData} />
      </StyledDiv>
    </>
  );
};

export default SideMenu;
