import React from "react";
import {useRef,useState,useEffect} from "react";
import { UpdateProductService } from "../../../services/Products";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import { Scrollbars } from "react-custom-scrollbars-2";
import swal from 'sweetalert';


export const UpdateProduct=()=>
{
    
    const [productname, setproductname] = useState("");
    const [productprice, setproductprice] = useState("");
    const [brandname, setbrandname] = useState("");
    const [productquantity, setproductquantity] = useState("");
    const [productimage, setproductimage] = useState("");
    const [_id, setId] = useState("");
    let editProductName = useRef("");
    let editPrice = useRef("");
    let editBrandName = useRef("");
    let editQuantity = useRef("");
    let editProductImage = useRef("");
    const navigate = useNavigate();
    const [Imageerror, setproductImageError] = useState("");
  
     

  useEffect(() => {
    setproductname(localStorage.getItem("Product Name"));
    setproductprice(localStorage.getItem('Product Price'));
    setbrandname(localStorage.getItem('Brand Name'));
    setproductquantity(localStorage.getItem('Product Quantity'));
    setproductimage(localStorage.getItem("Product Image"));
    setId(localStorage.getItem("ID"))
    console.log(productname);
    
}, [])
const handleChange = (event) => {
  const image = event.target.files[0];
  if (!image) {
   console.log('image is required');
   return false;
   }
   if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
    //  console.log('select valid image.');
    setproductImageError("select valid image format.")
   
   }
  }
const updateProduct = () => {
  if(Imageerror)
  {
  //  alert("Please Fill all Fields correctly");
  swal({
    icon: 'error',
    title: 'Oopss...Validation Error',
    text: 'Please fill all the fields as per format!',
    
  }) .then(function() {
        
    window.location.href = `/updateproduct/${_id}`;
  })
   return;

  }
  const updatedProductName = editProductName.current.value;
  const updatedPrice = editPrice.current.value;
  const updatedBrandname = editBrandName.current.value;
  const updatedquantity = editQuantity.current.value;
  const updatedProductedImage = editProductImage.current.files[0];
  let item = {
    name: updatedProductName,
    price: updatedPrice,
    brand_name: updatedBrandname,
    product_quantity: updatedquantity,
    ProductImage: updatedProductedImage,
    _id,
  };

  UpdateProductService(item);
  swal("Product Updated Successfully", "Product has been updated click ok to view", "success")
  .then(function() {
    navigate("/viewlistofproduct");
    
  });
 
};
return(
  <div>
   <Scrollbars style={{ height: 520 }}>
      <Box className="heroku"
    display="flex"
    flexDirection={"column"}
    maxWidth={400}
    alignItems="center"
    justifyContent={"center"}
    margin="auto"
    marginTop={1}
    padding={5}
    borderRadius={2}

  >
<PublishedWithChangesOutlinedIcon style={{  width: '20vw', height: '7vh',}} />
<Typography variant="h4" textAlign="center" margin={2} className="iphone">Update Product</Typography>
      Product Name :
      <TextField
     
      value={productname}
       onChangeCapture={(e) => setproductname(e.target.value)}
       inputRef={editProductName}
       id="standard-basic"
       variant="outlined"
       margin="normal"
     
      />
      Product Price:
       <TextField
      value={productprice}
      type="number" 
      inputProps={{ min: 0 }}
       onChangeCapture={(e) => setproductprice(e.target.value)}
       inputRef={editPrice}
       id="standard-basic"
       variant="outlined"
       margin="normal"
     
      />
      Product BrandName
       <TextField
      value={brandname}
       onChangeCapture={(e) => setbrandname(e.target.value)}
       inputRef={editBrandName}
       id="standard-basic"
       variant="outlined"
       margin="normal"
     
      />
      Product Quantity
       <TextField
      value={productquantity}
      type="number" 
      inputProps={{ min: 0 }}
       onChangeCapture={(e) => setproductquantity(e.target.value)}
       inputRef={editQuantity}
       id="standard-basic"
       variant="outlined"
       margin="normal"
     
      />
    
     <br></br>
     Product Image
         <img style={{width:100}} src={"http://localhost:5000/" +productimage } ></img>
     <Button variant="contained" >
      <input
         type="file"
         class="form-control-file"
         className="abc"
      //    value={categoryimage}
         onClick={(e) => setproductimage(e.target.files[0])}
         ref={editProductImage}
         onChange={handleChange}
       
      />
      </Button>
      {Imageerror ? (
            <span className="text-danger">{Imageerror}</span>
          ) : null
             }

   
     <br></br>
     

  
  <Button sx={{ '& button': { m: 2 } }} size="large"
    variant="contained" onClick={updateProduct}>
    Update
  </Button>
  </Box>
  </Scrollbars>
  </div>
)












}
