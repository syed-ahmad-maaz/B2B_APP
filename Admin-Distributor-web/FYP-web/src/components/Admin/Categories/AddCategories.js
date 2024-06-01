import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddCategories } from "../../../services/Categories";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import swal from 'sweetalert';
const AddedCategories = () => {
  const CategoryName = useRef(null);
  let CategoryImage = useRef("");
  const [categoryerror, setcategoryerror] = useState("");
  const [Imageerror, setcategoryImageError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
  }, []);
 

 
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
  
  const handlesubmit = (e) => {
    if (CategoryName.current.value == "" || CategoryImage.current.files[0] == null) {
      swal({
        icon: 'error',
        title: 'Oops...Empty Categories Credentials',
        text: 'Please fill all the fields!',
        
      })
      return;
     
     
    }
    if(categoryerror || Imageerror)
    {
    //  alert("Please Fill all Fields correctly");
    swal({
      icon: 'error',
      title: 'Oopss...Validation Error',
      text: 'Please fill all the fields as per format!',
      
    }) .then(function() {
          
      window.location.href = '/addedcategories';
    })
     return;
 
    }
    if (
      CategoryName.current.value != "" &&
    
      categoryerror == "" 
      // &&
      // CategoryImage.current.files[0] != "" &&
      // Imageerror==""
     
    ) {
      AddCategories(
        CategoryName.current.value,
        CategoryImage.current.files[0]
      ).then((result) => {
        if (!result) {
          swal({
            icon: 'error',
            title: 'Oops...Duplicate Entryyy',
            text: 'Duplicate category name not alloweed!',
            
          })
          navigate("/addedcategories");
          return;
        } 
      });
    }
    swal("Category Added Successfully", "View your added category by pressing ok", "success")
   
    navigate("/viewlistofcategory");
  };

  return (
    <div>
    
      <form >
        <Box className="heroku"
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={5}
        //  borderRadius={15}
       
        >
        <CategoryTwoToneIcon style={{  width: '20vw', height: '7vh',}} />
        <Typography variant="h4" textAlign="center" margin={2} className="iphone">Add Category</Typography>
          <TextField
      
            margin="normal"
            inputRef={CategoryName}
            onBlur={(e) => categoryvalidation(e.target.value)}
            label="Enter Category Name:"
            id="standard-basic"
            variant="outlined"
           
          />
             {categoryerror ? (
            <span className="text-danger">{categoryerror}</span>
          ) : null
             }
           
         
      
       <br></br>
        <Button variant="contained" >
          <input
            type="file"
            CategoryImage="CategoryImage"
            // className="form-control-file"
            ref={CategoryImage}
            onChange={handleChange}
            className="abc"
            />
          
        </Button>
        {Imageerror ? (
            <span className="text-danger">{Imageerror}</span>
          ) : null
             }
           
      
        <br></br>
        <Button  sx={{ '& button': { m: 2 } }} size="large"
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
  );
};
export default AddedCategories;
