import React, {useRef,useState,useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Image from '../../../View/thapa.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Scrollbars } from "react-custom-scrollbars-2";
import LoginforAdmin  from '../../../services/Login';
import { GetListOfAdmin } from "../../../services/Login";
import swal from 'sweetalert';
import Swal from 'sweetalert2';


const Login = () => {
  const email=useRef(null);
  const password=useRef(null);
  const [emailerror, setemailerror] = useState("");
  const [admin, setadmin] = useState([]);
  const theme = createTheme();
  useEffect(() => {
   
    GetListOfAdmin().then((items) => {
      setadmin(items);
    });
  }, []);
 
 
  const handlesubmit= (e) => {
    if (email.current.value == "" && password.current.value == "") {
      // swal("Please fill all the fields!", "Empty Form!", "success");
      swal({
        icon: 'error',
        title: 'Oops...Admin Credentials are empty',
        text: 'Please fill all the fields!',
        
      })
      return;
    }
    if (email.current.value == "" ) {
     
      swal({
        icon: 'error',
        title: 'Email can not be empty',
        text: 'Something went wrong!',
        
      })
      return;
    }
    if(password.current.value == "")
    {
      swal({
        icon: 'error',
        title: 'password can not be empty',
        text: 'Please fill the password field!',
        
      })
      return;
    }
 
    LoginforAdmin(email.current.value,password.current.value).then(
    (result) => {
      if (!result) {
      
        swal("User not found!", "Failed to Authenticate", "error");
      } else {
         
        {admin.map((item) => (
                
        
          Swal.fire(
            "Welcome " + item.name, "Logged in Successfully",
            'success'
          )
          .then(function() {
          
            window.location.href = '/home';
          })
      ))}
      }
    }
  );
    
   
  };
  
  const emailvalidation=(e)=>
  {
  
    // const reg=/^[A-Z0-9_%+-]+@[A-Z0-9-]+.\.[A-Z]{2,4}$/i; 
    const reg=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.\.[A-Z]{2,4}$/i;
    if (reg.test(e) === false) {
      setemailerror("Enter Valid Email Please");
    }
    else{
      setemailerror("")
    }

  }


  return (
    <>
    <Scrollbars style={{  height: 562 }}>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // https://source.unsplash.com/700x400/?user,login 
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundImage: `url(${Image})`,
            
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'dark' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 7,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1,width:'15%', bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon  />
            </Avatar>
            <Typography component="h2" variant="h5">
              Admin Login
            </Typography>
            <Box    sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                sx={{ width: '90%' }}
                inputRef={email}
                onBlur={(e) => emailvalidation(e.target.value)}
                id="email"
                label="Enter your email address"
                name="email"
                autoComplete="email"
                // autoComplete="off"
                // autoFocus
              />
              <br></br>
               {emailerror ? (
            <span className="text-danger">{emailerror}</span>
          ) : null}
              <br></br>
              <TextField
                margin="normal"
                inputRef={password}
                required
                sx={{ width: '90%' }}
                name="password"
                label="Enter your password"
                type="password"
                id="password"
               
              />

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
               onClick={() => {
            // LoginforAdmin(email.current.value,password.current.value);
            handlesubmit();
          }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2,width: '90%' }}
              
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>   
                {/* <Link href="/hello" variant="body2"> */}
                <Link href="/confirmemail" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
          
              </Grid>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Scrollbars>
    </>
  );
}

export default Login;