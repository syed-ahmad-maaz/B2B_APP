import { useState, useEffect, useRef } from "react";
import "./ViewProduct.css";
import { useNavigate,Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GetListOfProduct } from "../../../services/Products";
import { DeleteProductService } from "../../../services/Products";
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
import Divider from '@mui/material/Divider';
import Swal from 'sweetalert2';

const ViewListOfProduct = () => {
  const [product, setproduct] = useState([]);
  const [_id, setId] = useState("");
  let name = useRef("");
  let editProductName = useRef("");
  let price = useRef("");
  let editPrice = useRef("");
  let brand_name = useRef("");
  let editBrandName = useRef("");
  let product_quantity = useRef("");
  let editQuantity = useRef("");
  let ProductImage = useRef("");
  let editProductImage = useRef("");
  const navigate = useNavigate();
  const ListOfProduct = () => {
    GetListOfProduct().then((items) => {
      setproduct(items);
    });
  };
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
    ListOfProduct();
  }, []);

  const deleteProduct = (item) => {
    
    Swal.fire({
      title: item.name +' move to trash?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        DeleteProductService(item._id);
        Swal.fire(
          'Successfully Deleted!',
          `${item.name} entire product has been move to recycle bin.`,
          'success'
        )
        .then(function() {
          
          window.location.href = '/viewlistofproduct';
         
         
        })
      
        
      }
    
    })
 
  
   
    ListOfProduct();
  };
  
  const LoadProductFields=(item)=>
  {
    
    
    localStorage.setItem("ID",item._id)
    localStorage.setItem("Product Name",item.name)
    localStorage.setItem("Product Image",item.ProductImage)
    localStorage.setItem("Product Price",item.price)
    localStorage.setItem("Brand Name",item.brand_name)
    localStorage.setItem("Product Quantity",item.product_quantity)
   
  
  }
  return (
    <div >
      <Scrollbars style={{ height: 490 }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {Array.isArray(product) ? (
            product.map((item, i) => (
              /* sx={{ maxWidth: 345, marginLeft:4, marginTop:4 }}   */
              /* marginRight:5  */
              <Card className="codewithsherry"
                 sx={{ maxWidth: 345,marginLeft:3.75, marginTop:4,
                  border: 1,borderColor: 'text.primary'}} 
              
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.REACT_APP_LOCAL_HOST_PATH}${item.ProductImage}`}
                  alt="green iguana"
                />
                <br></br>
                <Divider  sx={{ backgroundColor:'black'}} />
               
                
          
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  <b className="new" >{item.name} </b>
                  <Divider  sx={{ backgroundColor:'black'}} />
                  </Typography>
                 
                  <Typography variant="body2" color="text.secondary">
                    <b className="new1">Added By  : </b>
                    <b className="new1">{item.AdminId.name}</b>
                  </Typography>
                  <Divider  sx={{ backgroundColor:'black'}} />
                  <br></br>
                  <Typography variant="body2" component="div">
                    <b>Price : </b>
                     {item.price} $ 
                  </Typography>
                  <Divider  sx={{ backgroundColor:'black'}} />
                  <Typography variant="body2" component="div">
                    <b>Brand :  </b>
                    {item.brand_name}
                  </Typography>
                  <Divider  sx={{ backgroundColor:'black'}} />
                  <Typography variant="body2" component="div">
                    <b>Quantity : </b>
                    {item.product_quantity}
                  </Typography>
                  <Divider  sx={{ backgroundColor:'black'}} />
                  <Typography variant="body2" component="div">
                    <b>Category : </b>
                    {item.CategoryId.category_name}
                  </Typography>
                  <Divider  sx={{ backgroundColor:'black'}} />
              
                  {/* <Typography variant="body2" component="div">
                    <b>Category Image: </b>
                    <img
                      src={`${process.env.REACT_APP_LOCAL_HOST_PATH}${item.CategoryId.CategoryImage}`}
                      width="140"
                      height="80"
                      alt="Purani Fields"
                    />
                  </Typography> */}
                </CardContent>
                <Divider  sx={{ backgroundColor:'black'}} />
                <CardActions>
                <Link to={"/updateproduct/"  + item._id}>
                  <Button
                    sx={{ color: "success.main" }}
                    onClick={() => LoadProductFields(item)}
                  >Edit
                    <EditIcon />
                  </Button>
                  </Link>
                  <Button
                    sx={{ color: "error.main" }}
                    onClick={() => deleteProduct(item)}
                  >Delete
                    <DeleteIcon />
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <></>
          )}
        </Grid>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        {/* <div class="center">
          <form>
            <div class="txt_field">
              <b className="edits">Edit Product Name:</b>
              <TextField
                margin="normal"
                inputRef={editProductName}
                id="standard-basic"
                variant="outlined"
              />
              <b className="edits">Edit Price:</b>
              <TextField
                margin="normal"
                type="number"
                inputRef={editPrice}
                id="standard-basic"
                variant="outlined"
              />
              <b className="edits">Edit Brand Name:</b>
              <TextField
                margin="normal"
                inputRef={editBrandName}
                id="standard-basic"
                variant="outlined"
              />
              <br></br>
              <b className="edits">Edit Product Quantity:</b>
              <TextField
                margin="normal"
                type="number"
                inputRef={editQuantity}
                id="standard-basic"
                variant="outlined"
              />
            </div>

          
            
            <b className="edits">Edit Product Image: </b>
            <Button variant="contained">
              <input
                type="file"
                filename="ProductImage"
                className="form-control-file"
                ref={editProductImage}
              />
            </Button>
          </form>
          <br></br>
         
        </div>
        <br></br>
          

        <button className="updatebuttons" onClick={updateProduct}>
          Click to Update
        </button> */}
      </Scrollbars>
    </div>
  );
};
export default ViewListOfProduct;
