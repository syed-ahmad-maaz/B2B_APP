import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateDistributor } from "../../services/Distributor";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { GetRegionList } from "../../services/Regions";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GetListOfRetailers } from "../../services/Retailer";
import swal from "sweetalert";
import Multiselect from "multiselect-react-dropdown";

const CreateNewDistributor = () => {
  const FirstName = useRef(null);
  const LastName = useRef(null);
  const Email = useRef(null);
  const Password = useRef(null);
  const [regionlist, setregionlist] = useState([]);
  const [retailerlist, setretailerlist] = useState([]);
  const [UserId, setUserId] = useState([]);
  const RegionId = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }

    GetRegionList().then((items) => {
      setregionlist(items);
    });

    GetListOfRetailers().then((items) => {
      setretailerlist(items);
    });
  }, []);

  const handlesubmit = (e) => {
    CreateDistributor(
      FirstName.current.value,
      LastName.current.value,
      Email.current.value,
      Password.current.value,
      RegionId.current.value,
      UserId
    );
    swal("Distributor Added", "Click ok to view the distributor", "success");
    navigate("/viewdistributor");
  };

  const handleSelect = function (TotalRetailers) {
    const flavors = [];

    for (let i = 0; i < TotalRetailers.length; i++) {
      flavors.push(TotalRetailers[i].value);
    }

    setUserId(flavors);
  };

  const validateForm = () => {
    if (
      !FirstName.current.value ||
      !LastName.current.value ||
      !Email.current.value ||
      !Password.current.value ||
      !RegionId.current.value ||
      UserId.length === 0
    ) {
      swal({
        icon: "error",
        title: "Oops... Empty Distributor Credentials",
        text: "Please fill all the fields!",
      });
      return false;
    }

    return true;
  };

  const handleSubmitClick = () => {
    if (validateForm()) {
      handlesubmit();
    }
  };

  return (
    <Scrollbars style={{ height: 525 }}>
      <div>
        <form>
          <Box
            className="heroku"
            display="flex"
            flexDirection={"column"}
            maxWidth={402}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={1}
            padding={2}
          >
            <GroupAddIcon style={{ width: "20vw", height: "7vh" }} />
            <Typography
              variant="h4"
              textAlign="center"
              margin={1}
              className="iphone"
            >
              Add Distributors
            </Typography>
            <TextField
              margin="normal"
              inputRef={FirstName}
              sx={{ width: "90%" }}
              label="Enter your first name:"
              id="standard-basic"
              variant="outlined"
            />

            <TextField
              margin="normal"
              inputRef={LastName}
              sx={{ width: "90%" }}
              label="Enter your Last name:"
              id="standard-basic"
              variant="outlined"
            />

            <TextField
              margin="normal"
              inputRef={Email}
              sx={{ width: "90%" }}
              label="Enter your email address"
              id="standard-basic"
              variant="outlined"
            />

            <TextField
              margin="normal"
              inputRef={Password}
              type="password"
              sx={{ width: "90%" }}
              label="Enter your password:"
              id="standard-basic"
              variant="outlined"
            />

            <br />
            <div>
              <select ref={RegionId}>
                <option disabled defaultValue>
                  Click to Select Regions
                </option>

                {regionlist.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.region}
                  </option>
                ))}
              </select>
              <br />
              <br />
              <div>
                <select
                  multiple
                  onChange={(e) => {
                    handleSelect(e.target.selectedOptions);
                  }}
                >
                  {retailerlist.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.FirstName} {item.LastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div></div>
            <br />
            <Button
              sx={{ "& button": { m: 2 } }}
              size="large"
              variant="contained"
              onClick={handleSubmitClick}
            >
              Add
            </Button>
          </Box>
        </form>
      </div>
    </Scrollbars>
  );
};

export default CreateNewDistributor;
