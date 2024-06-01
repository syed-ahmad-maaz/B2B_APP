import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddProduct } from "../../../services/Products";
import { GetListOfCategory } from "../../../services/Categories";
import { Scrollbars } from "react-custom-scrollbars-2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import swal from 'sweetalert';

const AddedProduct = () => {
  const name = useRef(null);
  const price = useRef(null);
  const brand_name = useRef(null);
  const product_quantity = useRef(null);
  const CategoryId = useRef(null);
  let ProductImage = useRef("");
  const navigate = useNavigate();
  const [categorieslist, setcategorieslist] = useState([]);
  const [Imageerror, setproductImageError] = useState("");
  

  const handlesubmit = (e) => {
    if (name.current.value == "" || ProductImage.current.files[0] == null || CategoryId.current.value==""
    || price.current.value=="" || brand_name.current.value=="" || product_quantity.current.value==""
     ) {
      swal({
        icon: 'error',
        title: 'Oops...Empty Product Credentials',
        text: 'Please fill all the fields!',
        
      }).then(function() {
          
        window.location.href = '/addedproduct';
      })
      return;
     
     
    }
  
    if(producterror || priceerror || quantityerror || branderror || Imageerror)
    {
    //  alert("Please Fill all Fields correctly");
    swal({
      icon: 'error',
      title: 'Oopss...Validation Error',
      text: 'Please fill all the fields as per format!',
      
    }) .then(function() {
          
      window.location.href = '/addedproduct';
    })
     return;
 
    }
    AddProduct(
      name.current.value,
      price.current.value,
      brand_name.current.value,
      product_quantity.current.value,
      CategoryId.current.value,
      ProductImage.current.files[0]
    )
    swal("Product Added Successfully", "View your added product by pressing ok", "success")
    navigate("/viewlistofproduct");

    
  };
 
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

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
    GetListOfCategory().then((items) => {
      setcategorieslist(items);
    });
  }, []);
  // height: 400 
  const [producterror, setproductnameerror] = useState("");

  // const namevalidation = (e) => {
  //   const reg = /^[a-zA-Z ]*$/;
  //   if (reg.test(e) === false) {
  //     setproductnameerror("Enter Valid Product Name");
  //   } else if (e.trim().length == 0) {
  //     setproductnameerror("Product Name can't be empty");
  //   } else if (e.trim().length <= 1) {
  //     setproductnameerror("Enter at least 2 characters ");
  //   } else {
  //     setproductnameerror("");
  //   }
  // };
  const [priceerror, setpriceerror] = useState("");

  const pricevalidation= (e) => {
    const reg=/^-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/;
    if (reg.test(e) === false) {
      setpriceerror("Enter Valid Price ");
    } else if (e.trim().length === 0) {
      setpriceerror("Price Name can't be empty");
    } else {
      setpriceerror("");
    }
  };
  const [quantityerror, setquantityerror] = useState("");

  const Quantityvalidation= (e) => {
    // const reg=/^-?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)$/;
    const reg=/[0-9]|\./;
    if (reg.test(e) === false) {
      setquantityerror("Enter Valid Quality please ");
    } else if (e.trim().length === 0) {
      setquantityerror("Quality Name can't be empty");
    } else {
      setquantityerror("");
    }
  };


  const [branderror, setbranderror] = useState("");

  const brandnamevalidation= (e) => {
    const reg = /^[a-zA-Z0-9]*$/;
    if (reg.test(e) === false) {
      setbranderror("Enter Valid Brand Name");
    } else if (e.trim().length == 0) {
      setbranderror("Brand Name can't be empty");
    } else if (e.trim().length <= 1) {
      setbranderror("Enter at least 2 characters ");
    } else {
      setbranderror("");
    }
  };


  return (
    <Scrollbars style={{  height: 525  }}>
      <div>
        <form>
       
        <Box
         className="heroku"
            display="flex"
            flexDirection={"column"}
            maxWidth={430}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={1}
            padding={1}
            // borderRadius={7}
       
        >
           <ProductionQuantityLimitsOutlinedIcon style={{  width: '20vw', height: '8vh'}} />
           <Typography
           variant="h4"
            textAlign="center"
            margin={1}
            className="mac"
       >
              Add Product
            </Typography>
            
            <TextField 
             margin="normal"
            inputRef={name}
              // onBlur={(e) => namevalidation(e.target.value)}
              id="standard-basic"
              label="Enter the name of product:"
              variant="outlined"
             />
        
             {producterror ? (
            <span className="text-danger">{producterror}</span>
          ) : null}

         
            <TextField
              type="number"
              inputProps={{ min: 0 }}
              margin="normal"
              id="standard-basic"
              label="Enter the price :"
              inputRef={price}
              onBlur={(e) => pricevalidation(e.target.value)}
            
            />
              {priceerror ? (
            <span className="text-danger">{priceerror}</span>
          ) : null}

            <TextField
              margin="normal"
              inputRef={brand_name}
              onBlur={(e) => brandnamevalidation(e.target.value)}
              id="standard-basic"
              label="Enter the Brand name :"
              variant="outlined"
            
            />
            {branderror ? (
            <span className="text-danger">{branderror}</span>
          ) : null}

            <TextField
              type="number" 
              inputProps={{ min: 0 }}
              margin="normal"
              id="standard-basic"
              label="Enter the Quantity :"
              inputRef={product_quantity}
              onBlur={(e) => Quantityvalidation(e.target.value)}
            
              
             
            />
            {quantityerror ? (
            <span className="text-danger">{quantityerror}</span>
          ) : null}
            <br></br>
            <div>
              <select ref={CategoryId}>
            
                <option selected disabled>
                  Click to Select Category
                </option>
               
                {categorieslist.map((item) => (
                
                  <option value={item._id}>{item.category_name}</option>
              
    
                ))}
              
              </select>
             
            </div>
            <br></br>
            <Button variant="contained" >
              <input
            
                type="file"
                filename="ProductImage"
                // className="form-control-file"
                // className="abd"
                onChange={handleChange}
                className="abc"
                ref={ProductImage}
                
              />
            </Button>
            {Imageerror ? (
            <span className="text-danger">{Imageerror}</span>
          ) : null
             }

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
    </Scrollbars>
  );
};
export default AddedProduct;
