import "./ViewCategory.css";
import React, { useEffect, useState, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useNavigate,Link } from "react-router-dom";
import { GetListOfCategory } from "../../../services/Categories";
import { DeleteCategoryService } from "../../../services/Categories";
import Divider from '@mui/material/Divider';
import Swal from 'sweetalert2';

const ViewListOfCategory = () => {
  const navigate = useNavigate();
  const [categorieslist, setcategoryarray] = useState([]);
  const [_id, setId] = useState("");
  let category_name = useRef("");
  let editCategoryName = useRef("");
  let CategoryImage = useRef("");
  let editCategoryImage = useRef("");
  const ListOfCategories = () => {
    GetListOfCategory().then((items) => {
      setcategoryarray(items);
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
    ListOfCategories();
  }, []);

  
 

  const deleteCategory = (item) => {
    Swal.fire({
      title: item.category_name + ' move to trash?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        DeleteCategoryService(item._id);
        Swal.fire(
          'Successfully Deleted!',
          `${item.category_name} category has been move to recycle bin.`,
          'success'
        )
        .then(function() {
          
          window.location.href = '/viewlistofcategory';
         
         
        })
      
        
      }
    
    })
 
  
    
    ListOfCategories();
  };
  const LoadCategoriesFields=(ID,Name,CategoryImage)=>
  {
    
    
    localStorage.setItem("ID",ID)
    localStorage.setItem("Name",Name)
    localStorage.setItem("CategoryImage",CategoryImage)
   
  
  }

  return (
    <div>
      <Scrollbars style={{ height: 520 }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          // marginTop={1}
         
          // margin="auto"
        >
          {Array.isArray(categorieslist) ? (
            categorieslist.map((item, i) => (
            
              <Card className="codewithsherry"
              sx={{ maxWidth: 345, marginLeft:4, marginTop:4, border: 1,borderColor: 'text.primary' }} 
                
              >
              
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.REACT_APP_LOCAL_HOST_PATH}${item.CategoryImage}`}
                  alt="green iguana"
                />
                <br></br>
                <Divider  sx={{ backgroundColor:'black'}} />
                <CardContent>
              
                  <Typography gutterBottom variant="h5" component="div" >
               
                   <b className="new" >{item.category_name}</b>
                   <Divider  sx={{ backgroundColor:'black'}} />
                  </Typography>
                
                  <Typography variant="body2" color="white">
                    <b className="new1">Added By : </b>
                 <b className="new1"> {item.AdminId.name}</b>
                  </Typography>
                 
                </CardContent>
                <Divider  sx={{ backgroundColor:'black'}} />
              
                <CardActions>
                <Link to={"/updatecategory/"  + item._id}>
                
             
                <Button sx={{ color: "success.main" }} 
                 onClick={()=>LoadCategoriesFields(item._id,item.category_name,item.CategoryImage)}
                 >Edit
                <EditIcon /></Button>
                </Link>
                  <Button
                    sx={{ color: "error.main" }}
                    onClick={() => deleteCategory(item)}
                  >
                   delete <DeleteIcon />
                  
                  </Button>
                 
                </CardActions>
              
              </Card>
              
            ))
          ) : (
            <></>
          )}
        </Grid>

      
      </Scrollbars>
    </div>
  );
};
export default ViewListOfCategory;
