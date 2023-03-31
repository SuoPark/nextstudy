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
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = (event: React.FormEvent) => {
    event.preventDefault();
    auth.login({ userId: id, password: password });
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
                  label="ID"
                  variant="outlined"
                  color="primary"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  type="text"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="password"
                  variant="outlined"
                  color="primary"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
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
