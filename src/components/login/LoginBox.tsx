import { AuthContext } from "@/context/AuthContext";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useContext } from "react";

const LoginBox = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [passWord, setPassWord] = useState<string>("");
  const login = (event: React.FormEvent) => {
    console.log("@");
    event.preventDefault();
    auth.login({ email: email, userName: "test", password: passWord });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      sx={{ height: "100vh" }}
    >
      <Grid item xs={3}>
        <Paper>
          <Box component="form" onSubmit={login} sx={{ padding: "15px" }}>
            <Grid container rowSpacing={2} direction={"column"}>
              <Grid item>
                <Typography>LOG IN</Typography>
              </Grid>
              <Grid item>
                <Divider />
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  label="email"
                  variant="outlined"
                  color="primary"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="password"
                  variant="outlined"
                  color="primary"
                  value={passWord}
                  onChange={(e) => {
                    setPassWord(e.target.value);
                  }}
                  type="password"
                />
              </Grid>

              <Grid item container justifyContent={"right"}>
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginBox;
