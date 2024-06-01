import { useEffect, useRef, useState } from "react";
// import {useNavigate} from 'react-router-dom';
import { AddRegion } from "../../../services/Regions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AlbumIcon from "@mui/icons-material/Album";
import { Route, useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import AddHomeWorkTwoToneIcon from '@mui/icons-material/AddHomeWorkTwoTone';
import swal from 'sweetalert';

const AddedRegion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
  }, []);

  const region = useRef(null);
  const capital = useRef(null);
  const [regionerror, setregionerror] = useState("");
  const [capitalerror, setcapitalrror] = useState("");

  const regionvalidation = (e) => {
    const reg = /^[a-zA-Z ]*$/;
    if (reg.test(e) === false) {
      setregionerror("Enter Valid Region Name");
    } else if (e.trim().length == 0) {
      setregionerror("Region Name can't be empty");
    } else if (e.trim().length <= 1) {
      setregionerror("Enter at least 2 characters ");
    } else {
      setregionerror("");
    }
  };
  const capitalvalidation = (e) => {
    const reg = /^[a-zA-Z ]*$/;
    if (reg.test(e) === false) {
      setcapitalrror("Enter Valid Capital Name");
    } else if (e.trim().length == 0) {
      setcapitalrror("Capital Name can't be empty");
    } else if (e.trim().length <= 1) {
      setcapitalrror("Enter at least 2 characters ");
    } else {
      setcapitalrror("");
    }
  };

  const handlesubmit = () => {
    if (region.current.value == "" && capital.current.value == "") {
      swal({
        icon: 'error',
        title: 'Oops...Empty Regions Credentials',
        text: 'Please fill all the fields!',
        
      })
      return;
    }
    if (region.current.value == "" ) {
      swal({
        icon: 'error',
        title: 'Oops...Regions can not be empty',
        text: 'Please fill the region field!',
        
      })
      return;
    }
    if(capital.current.value == "")
    {
      swal({
        icon: 'error',
        title: 'Oops...Capital can not be empty',
        text: 'Please fill the capital field!',
        
      })
      return;
    }
    if(regionerror || capitalerror)
   {
    swal({
      icon: 'error',
      title: 'Oopss...Validation Error',
      text: 'Please fill all the fields as per format!',
      
    })
    return;

   }
    if (
      region.current.value != "" &&
      capital.current.value != "" &&
      regionerror == "" &&
      capitalerror == ""
    ) {
     
      AddRegion(region.current.value, capital.current.value).then((result) => {
        if (!result) {
          swal({
            icon: 'error',
            title: 'Oops...Duplicate Entryyy',
            text: 'Duplicate entry not alloweed!',
            
          })
          navigate('/addregion')
          return;
        
        } 
       
      });
      swal("Region Added Successfully", "View your added region by pressing ok", "success")
      navigate('/viewallregions')
      
    
    
    }
  
  
   
  };

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
          // borderRadius={17}
          
         
        >
        <AddHomeWorkTwoToneIcon style={{  width: '20vw', height: '9vh',}}/>
          <Typography
            variant="h4"
            textAlign="center"
            margin={1}
            className="mac"
          >
        Add Regions
            
          </Typography>

          <TextField
            margin="normal"
            inputRef={region}
            onBlur={(e) => regionvalidation(e.target.value)}
            id="standard-basic"
            label="Enter Region Name:"
            variant="outlined"
          />
          {regionerror ? (
            <span className="text-danger">{regionerror}</span>
          ) : null}
          <TextField
            margin="normal"
            inputRef={capital}
            onBlur={(e) => capitalvalidation(e.target.value)}
            id="standard-basic"
            label="Enter Capital Name:"
            variant="outlined"
          />
          {capitalerror ? (
            <span className="text-danger">{capitalerror}</span>
          ) : null}

          <br></br>
          <Button
            sx={{ "& button": { m: 2 } }}
            size="large"
            variant="contained"
            onClick={() => {
              handlesubmit();
            }}
          >
            Add
          </Button>
        </Box>
      </form>
    </div>
    // </Scrollbars>
  );
};

export default AddedRegion;
