import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "../atom/Button";
import Input from "../atom/Input";
import Box, { BoxType } from "../molecule/Box";

const StyledDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginForm = styled.form`
  width: 100%;
`;

const LoginBox = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [passWord, setPassWord] = useState<string>("");
  const login = (event: React.FormEvent) => {
    event.preventDefault();
    auth.login({ userEmail: email, userName: "test" });
  };

  return (
    <StyledDiv>
      <Box title="LOGIN">
        <LoginForm onSubmit={login}>
          <label>ID</label>
          <Input id="email" name="email" value={email} setValue={setEmail} />
          <label>PW</label>
          <Input id="pw" name="pw" value={passWord} setValue={setPassWord} />
          <Button content="Login" />
        </LoginForm>
      </Box>
    </StyledDiv>
  );
};

export default LoginBox;
