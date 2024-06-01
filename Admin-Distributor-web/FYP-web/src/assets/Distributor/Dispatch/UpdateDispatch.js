// import React from 'react'
import React from 'react';
import TextField from "@mui/material/TextField";
import {useRef,useState,useEffect} from "react";
import {useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Scrollbars } from "react-custom-scrollbars-2";
// import { UpdateDispatchServiceByD } from '../../../services/Dispatch';
import { UpdateDispatchServiceByDistributor } from '../../../services/Distributor';
import DashboardContent from '../Dashboard';
import swal from 'sweetalert';


export const UpdateDispatchByDistributor = () => {
    let FirstName = useRef(null);
    let LastName = useRef(null);
    let Email = useRef(null);
    // let Password = useRef(null);
    let Phone_no = useRef(null);
    const [updateFirstname, setfirstname] = useState("");
    const [updatelastname, setlastname] = useState("");
    const [_id, setId] = useState("");
    const [updatedemail, setupdatedemail] = useState("");
    const [updatepassword, setpassword] = useState("");
    const [updatephoneno, setphoneno] = useState("");
    const navigate=useNavigate();
    
  useEffect(() => {
    setfirstname(localStorage.getItem('FirstName'));
    setlastname(localStorage.getItem('LastName'));
    setupdatedemail(localStorage.getItem('Email'));
    setpassword(localStorage.getItem('Password'));
    setphoneno(localStorage.getItem('Phone No'));
    setId(localStorage.getItem('ID'))
}, [])
const updateDispatch = () => {
    console.log("hello");
    const updateFirstname = FirstName.current.value;
    const updatelastname = LastName.current.value;
    const updatedemail = Email.current.value;
    // const updatepassword = Password.current.value;
    const updatephoneno = Phone_no.current.value;
  
    let item = {_id ,  FirstName: updateFirstname, LastName: updatelastname,
        Email:updatedemail,Phone_no:updatephoneno};
  
        UpdateDispatchServiceByDistributor(item).then((result) => {
            if(result)
            {
              swal("Dispatch Updated Successfully", "Dispatch Updated click ok to view", "success")
              .then(function() {
                navigate("/listofdispatch");
                
              });
             
            }
            
            });
    
  };
  return (
    <div>
    <Box sx={{ display: 'flex' }}>

<DashboardContent />
<Box component="main" sx={{flexGrow:1 , p:10}}>
    <form>
      <Box
        className="heroku"
        display="flex"
        flexDirection={"column"}
        maxWidth={402}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={1}
        padding={2}
        //  borderRadius={15}
      >
        <GroupAddIcon style={{ width: "20vw", height: "7vh" }} />
        <Typography
          variant="h4"
          textAlign="center"
          margin={1}
          className="iphone"
        >
          Update Dispatch
        </Typography>
        <TextField
          margin="normal"
          inputRef={FirstName}
          sx={{ width: "90%" }}
          id="standard-basic"
          variant="outlined"
          value={updateFirstname}
          onChange={(e) => setfirstname(e.target.value)}
        />

        <TextField
          margin="normal"
          inputRef={LastName}
          sx={{ width: "90%" }}
          id="standard-basic"
          variant="outlined"
          value={updatelastname}
          onChange={(e) => setlastname(e.target.value)}
        />

        <TextField
          margin="normal"
          inputRef={Email}
          sx={{ width: "90%" }}
          id="standard-basic"
          variant="outlined"
          value={updatedemail}
          onChange={(e) => setupdatedemail(e.target.value)}
        />

      
      
        <TextField
          margin="normal"
          inputRef={Phone_no}
          sx={{ width: "90%" }}
          value={updatephoneno}
          id="standard-basic"
          variant="outlined"
          onChange={(e) => setphoneno(e.target.value)}
        />
        <br></br>
     
       
        <div></div>

        
        <Button
          sx={{ "& button": { m: 2 } }}
          size="large"
          variant="contained"
          onClick={updateDispatch}
        >
          Update
        </Button>
      </Box>
    </form>
    </Box>
    </Box>
  </div>
  )
}
