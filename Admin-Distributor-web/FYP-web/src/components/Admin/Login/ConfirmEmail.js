import { useEffect, useRef, useState } from "react";
import { AddRegion } from "../../../services/Regions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AlbumIcon from "@mui/icons-material/Album";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { Link } from "react-router-dom";
import { sendEmail } from "../../../services/SendEmail";
const ConfirmEmail=()=>
{
  
  const email=useRef(null);
  const [emailerror, setemailerror] = useState("");
  const handlesubmit=()=>
  {
    if (email.current.value == "" ) {
      alert("Email can't be empty");
      window.location.href = '/confirmemail'
      return;
    }
    if(emailerror)
    {
     alert("Invalid email address");
     window.location.href = '/confirmemail';
     return;
 
    }
    if (email.current.value != "" ) 
    {
      sendEmail(email.current.value);
      alert("Email Send")
    }
  }
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
        
        <div >
          <form>
          <br></br>
            <Box
              className="heroku"
              display="flex"
              flexDirection={"column"}
              maxWidth={450}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              // marginTop={3}
              padding={6}
              borderRadius={2}
              
             
            >
            <MarkEmailReadIcon style={{  width: '22vw', height: '9vh',}}/>
              <Typography
                variant="h4"
                textAlign="center"
                margin={1}
                className="mac"
              >
            Email Confirmation
                
              </Typography>
    
              <TextField
                margin="normal"
                inputRef={email}
                onBlur={(e) => emailvalidation(e.target.value)}
                sx={{ width: '75%' }}
                id="standard-basic"
                label="Enter Email:"
                variant="outlined"
              />
              <br></br>
               {emailerror ? (
            <span className="text-danger">{emailerror}</span>
            ) : null}
           
    
              <br></br>
              <Link to="/otpconfirmation">
              <Button
                sx={{ "& button": { m: 2 } }}
                size="large"
                variant="contained"
                onClick={() => {

            handlesubmit();
                }}
               
              >
                Send OTP
              </Button>
              </Link>
            </Box>
          </form>
        </div>
      
      );

}
export default ConfirmEmail;