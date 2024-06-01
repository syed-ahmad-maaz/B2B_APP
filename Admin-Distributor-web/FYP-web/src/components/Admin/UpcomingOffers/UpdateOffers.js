import React from "react";
import {useRef,useState,useEffect} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import { useNavigate } from "react-router-dom";
import { UpdateOffersService } from "../../../services/UpcomingOffers";
import { Scrollbars } from 'react-custom-scrollbars-2';
import swal from 'sweetalert';

export const UpdateOffers=()=>
{
    const [offerdescription, setofferdescription] = useState("");
    const [buyquantity, setbuyquantity] = useState("");
    const [getquantity, setgetquantity] = useState("");
    const [offerdate, setofferdate] = useState("");
    const [offerimage, setofferimage] = useState("");
    const [_id, setId] = useState("");
    let editdescription = useRef("");
    let editbuyquantity = useRef("");
    let editgetquantity = useRef("");
    let editofferdate = useRef("");
    let editofferimage = useRef("");
    const navigate = useNavigate();
    useEffect(() => {
        setofferdescription(localStorage.getItem("Offer Description"));
        setbuyquantity(localStorage.getItem('Buy Quantity'));
        setgetquantity(localStorage.getItem('Get Quantity'));
        setofferdate(localStorage.getItem('Offer Date'));
        setofferimage(localStorage.getItem("Offer Image"));
        setId(localStorage.getItem("ID"))
       
     }, [])
     const updateOffers = () => {
        const updatedDescription =  editdescription.current.value;
        const updatedOffersImage= editofferimage.current.files[0];
        const updatedBuyQuantity =  editbuyquantity.current.value;
        const updatedGetQuantity =  editgetquantity.current.value;
        const updatedExpiryDate =  editofferdate.current.value;
       
        let item = { description: updatedDescription, _id ,OfferImage:updatedOffersImage,
          BuyQuantity:updatedBuyQuantity,GetQuantity:updatedGetQuantity,Expiry_Date:updatedExpiryDate,
       };
        UpdateOffersService(item);
        swal("Offer Updated Successfully", "Offer has been updated click ok to view", "success")
  .then(function() {
    navigate("/viewupcomingoffers")
    
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
          borderRadius={15}
      
        >
      <PublishedWithChangesOutlinedIcon style={{  width: '20vw', height: '7vh',}} />
      <Typography variant="h4" textAlign="center" margin={2} className="iphone">Update Offers</Typography>
            Offer Description:
            <TextField
           
            value={offerdescription}
             onChangeCapture={(e) => setofferdescription(e.target.value)}
             inputRef={editdescription}
             id="standard-basic"
             variant="outlined"
             margin="normal"
           
            />
            Buy Quantity:
             <TextField
            value={buyquantity}
            type="number" 
            inputProps={{ min: 0 }}
             onChangeCapture={(e) => setbuyquantity(e.target.value)}
             inputRef={editbuyquantity}
             id="standard-basic"
             variant="outlined"
             margin="normal"
           
            />
            Get Quantity
             <TextField
            value={getquantity}
             onChangeCapture={(e) => setgetquantity(e.target.value)}
             inputRef={editgetquantity}
             id="standard-basic"
             variant="outlined"
             margin="normal"
           
            />
            Expiry Date:
             <TextField
              type="date" 
              margin="normal"
              value={offerdate}
              inputRef={editofferdate}
              onChangeCapture={(e) => setofferdate(e.target.value)}
              className="abc"
              id="standard-basic"
              variant="outlined"
              
            />
         Offer Image
         <img style={{width:100}} src={"http://localhost:5000/" +offerimage } ></img>
           <br></br>
           <Button variant="contained" >
            <input
               type="file"
               class="form-control-file"
               className="abc"
            //    value={categoryimage}
               onClick={(e) => setofferimage(e.target.files[0])}
               ref={editofferimage}
             
            />
            </Button>
           <br></br>
           
      
        
        <Button sx={{ '& button': { m: 2 } }} size="large"
          variant="contained" onClick={updateOffers}>
          Update
        </Button>
        </Box>
        </Scrollbars>
        </div>
      )
      
      



}