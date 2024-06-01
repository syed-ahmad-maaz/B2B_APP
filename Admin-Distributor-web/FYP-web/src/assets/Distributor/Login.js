import React, { useRef, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Image from "../../View/free.jpg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Scrollbars } from "react-custom-scrollbars-2";
import LoginforDistributor from "../../services/Distributor";
import swal from "sweetalert";
import Swal from "sweetalert2";

const DistributorLogin = () => {
  const Email = useRef(null);
  const Password = useRef(null);
  const [admin, setadmin] = useState([]);

  const theme = createTheme();
  const CategoryId = useRef(null);
  const [categorieslist, setcategorieslist] = useState([]);

  const handlesubmit = (e) => {
    LoginforDistributor(Email.current.value, Password.current.value)
      .then((result) => {
        const { error, FirstName, LastName } = result;
        {
          Swal.fire(
            "Welcome " + FirstName + " " + LastName,
            "Logged in Successfully",
            "success"
          ).then(function () {
            window.location.href = "/distributor/home";
          });
        }
      })
      .catch((error) => {
        if (error.message === "Login failed") {
          Swal.fire("User not found!", "Login failed", "error");
        } else if (error.message === "Distributor is blocked") {
          Swal.fire(
            "Profile Blocked",
            "Your profile has been blocked by the admin.",
            "error"
          );
        } else {
          Swal.fire("Error! Invalid Credentials", error.message, "error");
        }
      });
  };

  return (
    <>
      <Scrollbars style={{ height: 562 }}>
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${Image})`,

                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "dark"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "right",
                // height:570,
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 7,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, width: "15%", bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h2" variant="h5">
                  Distributor Login
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    margin="normal"
                    required
                    sx={{ width: "90%" }}
                    inputRef={Email}
                    id="Email"
                    label="Enter your Email address"
                    name="Email"
                    autoComplete="Email"
                  />
                  <br></br>

                  <br></br>
                  <TextField
                    margin="normal"
                    inputRef={Password}
                    required
                    sx={{ width: "90%" }}
                    name="Password"
                    label="Enter your Password"
                    type="Password"
                    id="Password"
                  />

                  <Button
                    onClick={() => {
                      handlesubmit();
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: "90%" }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Scrollbars>
    </>
  );
};

export default DistributorLogin;
