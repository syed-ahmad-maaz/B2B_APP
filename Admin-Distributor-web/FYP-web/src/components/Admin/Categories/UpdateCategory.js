import React from "react";
import {useRef,useState,useEffect} from "react";
import { UpdateCategoriesService } from "../../../services/Categories";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import swal from 'sweetalert';
import { Scrollbars } from "react-custom-scrollbars-2";


import {useNavigate } from "react-router-dom";
const UpdateCategory=()=>
{
  const [categoryname, setcategoryname] = useState("");
  const [categoryimage, setcategoryimage] = useState("");
  const [_id, setId] = useState("");
  const categoryyname = useRef("");
  const categoryyimage= useRef("");
  const navigate = useNavigate();
  const [Imageerror, setcategoryImageError] = useState("");
  const [categoryerror, setcategoryerror] = useState("");
 
  

  useEffect(() => {
    setcategoryname(localStorage.getItem('Name'));
    setcategoryimage(localStorage.getItem('CategoryImage'));
    setId(localStorage.getItem('ID'))
    console.log(categoryimage);
}, [])

const categoryvalidation = (e) => {
  const reg = /^[a-zA-Z ]*$/;
  if (reg.test(e) === false) {
    setcategoryerror("Enter Valid Category Name");
  }
  else if (e.trim().length == 0) {
    setcategoryerror("Category Name can't be empty");
  } else if (e.trim().length <= 1) {
    setcategoryerror("Enter at least 2 characters ");
  }
   else {
    setcategoryerror("");
  }
};

const handleChange = (event) => {
  const image = event.target.files[0];
  if (!image) {
   console.log('image is required');
   return false;
   }
   if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
    //  console.log('select valid image.');
    setcategoryImageError("select valid image format.")
   
   }
  }

const updatecategoryyy = () => {
  if(categoryerror || Imageerror)
  {
  //  alert("Please Fill all Fields correctly");
  swal({
    icon: 'error',
    title: 'Oopss...Validation Error',
    text: 'Please update all the fields as per format!',
    
  }).then(function() {
          
    window.location.href = `/updatecategory/${_id}`;
  })
   return;

  }
    const updatedCategoryName = categoryyname.current.value;
    const updatedCategoryImage = categoryyimage.current.files[0];
  
    let item = {
      category_name: updatedCategoryName,
      CategoryImage: updatedCategoryImage,
      _id,
    };
   
    UpdateCategoriesService(item).then((result) => {
      if(result)
      {
        swal("Category updated Successfully", "Category updated click ok to view", "success")
    .then(function() {
      navigate("/viewlistofcategory");
        
    });
      }
      });
 
  };
  



  

    return(
      // <Scrollbars style={{ height: 525 }}>
        <div>
            <Box className="heroku"
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={0.75}
          padding={1.5}
          borderRadius={3}
      
        >
<PublishedWithChangesOutlinedIcon style={{  width: '20vw', height: '7vh',}} />
<Typography variant="h4" textAlign="center" margin={1.5} className="iphone">Update Category</Typography>
<b>Category Name:</b>
            <TextField
            value={categoryname}
             onChangeCapture={(e) => setcategoryname(e.target.value)}
             inputRef={categoryyname}
             onBlur={(e) => categoryvalidation(e.target.value)}
             id="standard-basic"
             variant="outlined"
             margin="normal"
           
            />
             {categoryerror ? (
            <span className="text-danger">{categoryerror}</span>
          ) : null
             }
            <br></br>
            <b>Category Image:</b>
            <img style={{width:100}} src={"http://localhost:5000/" +categoryimage } ></img>
            <br></br>
            
           <Button variant="contained" >
          
            <input
               type="file"
               class="form-control-file"
               className="abc"
              
               
               
            //    value={categoryimage}
              //  onClick={(e) => setcategoryimage(e.target.files[0])}
               onChange={handleChange}
               ref={categoryyimage}
             
            />
            </Button>
            {Imageerror ? (
            <span className="text-danger">{Imageerror}</span>
          ) : null
             }
           
           <br></br>
           
    
        
        <Button sx={{ '& button': { m: 2 } }} size="large"
          variant="contained" onClick={updatecategoryyy}>
          Update
        </Button>
        </Box>
        </div>
        // </Scrollbars>
    )
    
   

}
export default UpdateCategory;