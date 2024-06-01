import React from "react";
import TextField from "@mui/material/TextField";
import {useRef,useState,useEffect} from "react";
import { UpdateRegionService } from "../../../services/Regions";
import {useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import swal from 'sweetalert';


const UpdateRegion=()=>
{
  const [regions, setregionstate] = useState("");
  const [capitall, setcapital] = useState("");
  const [_id, setId] = useState("");
  const RegionName = useRef("");
  const capitalName = useRef("");
  const navigate = useNavigate();
  const [regionerror, setregionerror] = useState("");
  const [capitalerror, setcapitalrror] = useState("");
 
  

  useEffect(() => {
    setregionstate(localStorage.getItem('Region'));
    setcapital(localStorage.getItem('Capital'));
    setId(localStorage.getItem('ID'))
}, [])

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

  
const updateRegion = () => {
  if(regionerror || capitalerror)
  {
  //  alert("Please Fill all Fields correctly");
  swal({
    icon: 'error',
    title: 'Oopss...Validation Error',
    text: 'Please update all the fields as per format numbers are not allowed!',
    
  })
   return;

  }
  const updatedRegionName = RegionName.current.value;
  const updatedCapitalName = capitalName.current.value;

  let item = {_id , region: updatedRegionName, capital: updatedCapitalName};

  UpdateRegionService(item).then((result) => {
  if(result)
  {
    swal("Region Updated Successfully", "Regionn Updated click ok to view", "success")
    .then(function() {
      navigate("/viewallregions");
      
    });
   
  }
  
  });
  
};


  

    return(
        <div>
           
           
            <Box
          className="heroku"
          display="flex"
          flexDirection={"column"}
          maxWidth={450}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={2}
          padding={6}
          borderRadius={13}
          
         
        >
        <PublishedWithChangesOutlinedIcon style={{  width: '20vw', height: '8.5vh',}} />
        <Typography variant="h4" textAlign="center" margin={2} className="iphone">Update Region</Typography>
            <div class="center">
          <form>
          <br></br>
            <b className="edits">Region:</b>
        
            <TextField
              margin="normal"
             value={regions}
             onChange={(e) => setregionstate(e.target.value)}
             onBlur={(e) => regionvalidation(e.target.value)}
              inputRef={RegionName}
              id="standard-basic"
              variant="outlined"
            />
            <br></br>
              {regionerror ? (
            <span className="text-danger">{regionerror}</span>
          ) : null}
            <br></br>
          
            <b>Capital:</b>
            <TextField
              margin="normal"
              value={capitall}
              onChange={(e) => setcapital(e.target.value)}
              onBlur={(e) => capitalvalidation(e.target.value)}
              inputRef={capitalName}
              id="standard-basic"
              variant="outlined"
            />
              <br></br>
             {capitalerror ? (
            <span className="text-danger">{capitalerror}</span>
          ) : null}

          
          </form>
       
          <br></br>
        
        </div>
        <br></br>
        <Button
            sx={{ "& button": { m: 2 } }}
            size="large"
            variant="contained"
            onClick={updateRegion}
          >
            Update
          </Button>

        </Box>
        </div>
    )

}
export default UpdateRegion;