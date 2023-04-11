import { AuthContext } from "@/context/AuthContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { EyeOutline, EyeOffOutline } from "mdi-material-ui";
import Link from "next/link";
import { useState, useContext } from "react";

const LoginBox = () => {
  const auth = useContext(AuthContext);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const login = (event: React.FormEvent) => {
    event.preventDefault();
    auth.login({ userId: id, password: password });
  };

  return (
    <Box
      className="content-center"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F8FA",
      }}
    >
      <Card sx={{ zIndex: 1, width: "28rem" }}>
        <CardContent sx={{ padding: "30px" }}>
          <Box
            sx={{
              mb: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "1.5rem !important",
              }}
            >
              {"TITLE-LOGIN"}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Welcome to {"TITLE"}! 👋🏻
            </Typography>
            <Typography variant="body2">{"sub-title"}</Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={login}>
            <TextField
              autoFocus
              fullWidth
              label="ID"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={password}
                id="auth-login-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => {
                        setShowPassword((state) => !state);
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember Me" />

              <Link onClick={(e) => e.preventDefault()} href={""}>
                Forgot Password?
              </Link>
            </Box>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 5 }}
              type="submit"
            >
              Login
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant="body2">
                <Link href="">Create an account</Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginBox;
