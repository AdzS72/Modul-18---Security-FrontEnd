import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    console.log({
      email,
      password,
    });

    // Tambahkan kode di bawah ini untuk mengambil data dari localstorage
    // 1. Lakukan Axios POST ke backend pada endpoint /login di bawah ini,
    // dengan parameter 'email' dan 'pass' yang didapat dari form (clue ada pada line 23 dan 24).
    try {
      const url = "https://adzs72-modul-17-security-backend-production.up.railway.app/login";
      const resp = await axios.post(url, {
        email: email,
        password: password,
      });
      console.log(resp);

      // simpan 'token' dan 'user' ke localStorage
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("user", resp.data.username);

      // jika berhasil, set localStorage 'user' dan 'token' serta redirect ke halaman profile
      navigate("/profile");

      // jika gagal, tampilkan alert 'Login Gagal'
    } catch (e) {
      alert("Login failed");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
