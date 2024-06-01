import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddOffers, ProductsList } from "../../../services/UpcomingOffers";
import { Scrollbars } from "react-custom-scrollbars-2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocalOfferTwoToneIcon from "@mui/icons-material/LocalOfferTwoTone";
import swal from "sweetalert";

const AddUpcomingOffers = () => {
  const description = useRef(null);
  const Expiry_Date = useRef(null);
  const BuyQuantity = useRef(null);
  const GetQuantity = useRef(null);
  const OfferImage = useRef(null);
  const BuyItem = useRef(null);
  const GetItem = useRef(null);
  const navigate = useNavigate();
  const [products, setproductlist] = useState([]);
  const [Imageerror, setcategoryImageError] = useState("");
  useEffect(() => {
    async function fetchdata() {
      if (!localStorage.getItem("admintoken")) {
        navigate("/adminlogin");
      }

      ProductsList().then((items) => {
        setproductlist(items);
      });
    }

    fetchdata();
  }, []);
  console.log("offerss sportss");
  console.log(products)
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
    if (
      description.current.value == "" ||
      Expiry_Date.current.value == "" ||
      OfferImage.current.files[0] == null ||
      BuyQuantity.current.value == "" ||
      GetQuantity.current.value == ""
    ) {
      swal({
        icon: "error",
        title: "Oops...Empty Offers Credentials",
        text: "Please fill all the fields!",
      }).then(function () {
        window.location.href = "/upcomingoffers";
      });
      return;
    }

    AddOffers(
      description.current.value,
      OfferImage.current.files[0],
      Expiry_Date.current.value,
      BuyQuantity.current.value,
      GetQuantity.current.value,
      BuyItem.current.value,
      GetItem.current.value
    );
    swal(
      "Offers Added Successfully",
      "View your added offer by pressing ok",
      "success"
    );
    navigate("/viewupcomingoffers");
  };

  return (
    <Scrollbars style={{ height: 527 }}>
      <div>
        <form>
          <Box
            className="heroku"
            display="flex"
            flexDirection={"column"}
            maxWidth={420}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={1}
            padding={1}
            // borderRadius={7}
          >
            <LocalOfferTwoToneIcon style={{ width: "20vw", height: "8vh" }} />
            <Typography variant="h4" textAlign="center" margin={2}>
              Add Offers
            </Typography>
            <TextField
              margin="normal"
              inputRef={description}
              id="standard-basic"
              label="Enter Description:"
              variant="outlined"
            />

            <TextField
              type="number"
              inputProps={{ min: 0 }}
              margin="normal"
              id="standard-basic"
              label="Enter Buy Quantity :"
              inputRef={BuyQuantity}
              variant="outlined"
            />
            <TextField
              type="number"
              inputProps={{ min: 0 }}
              margin="normal"
              id="standard-basic"
              label="Enter Get Quantity :"
              inputRef={GetQuantity}
              variant="outlined"
            />

            <TextField
              type="date"
              margin="normal"
              inputRef={Expiry_Date}
              id="standard-basic"
              variant="outlined"
              className="onlydate"
            />

            <br></br>

            <Button variant="contained">
              <input
                type="file"
                filename="OfferImage"
                className="abc"
                ref={OfferImage}
                onChange={handleChange}
              />
            </Button>
            {Imageerror ? (
            <span className="text-danger">{Imageerror}</span>
          ) : null
             }
            <br></br>

            <div>
              <select ref={BuyItem}>
                <option selected disabled>
                  Click to Choose Offer BuyItems
                </option>
                {products.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </select>
            </div>
            <br></br>
            <div>
              <select ref={GetItem}>
                <option selected disabled>
                  Click to Choose Offers GetItems
                </option>
                {products.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </select>
            </div>

            <br></br>
            <Button
              sx={{ "& button": { m: 2 } }}
              size="large"
              variant="contained"
              className="submitbutton"
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
export default AddUpcomingOffers;
