import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GetListOfOffers } from "../../../services/UpcomingOffers";
import { DeleteOfferService } from "../../../services/UpcomingOffers";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./Offers.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";

const ViewUpcomingOffers = () => {
  const [Offers, setOffers] = useState([]);
  const [_id, setId] = useState("");
  let description = useRef("");
  let setdescription = useRef("");
  let OfferImage = useRef("");
  let editOfferImage = useRef("");
  let BuyQuantity = useRef("");
  let EditBuyQuantity = useRef("");
  let GetQuantity = useRef("");
  let editGetQuantity = useRef("");
  let Expiry_Date = useRef("");
  let EditExpiryDate = useRef("");

  const navigate = useNavigate();
  const OfferList = () => {
    GetListOfOffers().then((items) => {
      setOffers(items);
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
    OfferList();
  }, []);
  const deleteOffers = (item) => {
    Swal.fire({
      title: item.description +" Offer move to trash?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteOfferService(item._id);
        Swal.fire(
          "Successfully Deleted!",
          `${item.description} offer has been deleted.`,
          "success"
        ).then(function () {
          window.location.href = "/viewupcomingoffers";
        });
      }
    });

    OfferList();
  };

  const LoadOffersFields = (item) => {
    localStorage.setItem("ID", item._id);
    localStorage.setItem("Buy Quantity", item.BuyQuantity);
    localStorage.setItem("Get Quantity", item.GetQuantity);
    localStorage.setItem("Offer Date", item.Expiry_Date);
    localStorage.setItem("Offer Description", item.description);
    localStorage.setItem("Offer Image", item.OfferImage);
  };

  return (
    <div>
      <Scrollbars style={{ height: 510 }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <br></br>

          {Array.isArray(Offers) ? (
            Offers.map((item, i) => (
              <Card
                className="codewithsherry"
                sx={{
                  maxWidth: 345,
                  marginLeft: 3.75,
                  marginTop: 4,
                  border: 1,
                  borderColor: "text.primary",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.REACT_APP_LOCAL_HOST_PATH}${item.OfferImage}`}
                  alt="green iguana"
                />
                <br></br>
                <Divider sx={{ backgroundColor: "black" }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.description}
                    <Divider sx={{ backgroundColor: "black" }} />
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <b className="new1">Added By : </b>
                    <b className="new1">{item.AdminId.name}</b>
                  </Typography>
                  <Divider sx={{ backgroundColor: "black" }} />

                  <Typography variant="body2" component="div">
                    <b>Expiry Date : </b>
                    {item.Expiry_Date}
                  </Typography>
                  <Divider sx={{ backgroundColor: "black" }} />
                  <Typography variant="body2" component="div">
                    <b>Buy Quantity : </b>
                    {item.BuyQuantity}
                  </Typography>
                  <Divider sx={{ backgroundColor: "black" }} />
                  <Typography variant="body2" component="div">
                    <b>Get Quantity: </b>
                    {item.GetQuantity}
                  </Typography>
                  <Divider sx={{ backgroundColor: "black" }} />
                  <Typography variant="body2" component="div">
                    <b>Buy Item: </b>
                    {item.BuyItem.name}
                  </Typography>
                  <Divider sx={{ backgroundColor: "black" }} />
                  <Typography variant="body2" component="div">
                    <b>Get Item: </b>
                    {item.GetItem.name}
                  </Typography>
                  <Divider sx={{ backgroundColor: "black" }} />
                </CardContent>
                <Divider sx={{ backgroundColor: "black" }} />
                <CardActions>
                  <Button
                    sx={{ color: "error.main" }}
                    onClick={() => deleteOffers(item)}
                  >
                    Delete
                    <DeleteIcon />
                  </Button>
                  <Link to={"/updateoffers/" + item._id}>
                    <Button
                      sx={{ color: "success.main" }}
                      onClick={() => LoadOffersFields(item)}
                    >
                      Edit
                      <EditIcon />
                    </Button>
                  </Link>
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
export default ViewUpcomingOffers;
