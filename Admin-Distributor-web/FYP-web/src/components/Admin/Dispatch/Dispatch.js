import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { CreateDistributor } from "../../services/Distributor";
// import { CreateBooker } from "../../../services/Booker";
import { CreateDispatch } from "../../../services/Dispatch";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import { GetRegionList } from "../../../services/Regions";
import { GetDistributorList } from "../../../services/Distributor";

import { Scrollbars } from "react-custom-scrollbars-2";

import swal from "sweetalert";

const CreateNewDispatch = () => {
  const FirstName = useRef(null);
  const LastName = useRef(null);
  const Email = useRef(null);
  const Password = useRef(null);
  const Phone_no = useRef(null);
  const [regionlist, setRegionlist] = useState([]);
  const RegionId = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }

    // Fetch region list
    GetDistributorList().then((items) => {
      setRegionlist(items);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (
      !FirstName.current.value ||
      !LastName.current.value ||
      !Email.current.value ||
      !Password.current.value ||
      !Phone_no.current.value ||
      !RegionId.current.value
    ) {
      swal({
        icon: "error",
        title: "Oops... Empty Dispatch Credentials",
        text: "Please fill all the fields!",
      });
      return;
    }
  
    // Check if a distributor is selected
    if (RegionId.current.value === "default") {
      swal({
        icon: "error",
        title: "Oops... No Distributor Selected",
        text: "Please select a distributor!",
      });
      return;
    }
  
    // Create dispatch
    CreateDispatch(
      FirstName.current.value,
      LastName.current.value,
      Email.current.value,
      Password.current.value,
      Phone_no.current.value,
      RegionId.current.value
    );
  };

  return (
    <Scrollbars style={{ height: 525 }}>
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            className="heroku"
            display="flex"
            flexDirection="column"
            maxWidth={402}
            alignItems="center"
            justifyContent="center"
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
              Add Dispatch
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
              label="Enter your last name:"
              id="standard-basic"
              variant="outlined"
            />

            <TextField
              margin="normal"
              inputRef={Email}
              sx={{ width: "90%" }}
              label="Enter your email address:"
              id="standard-basic"
              variant="outlined"
            />

            <TextField
              margin="normal"
              inputRef={Password}
              sx={{ width: "90%" }}
              label="Enter your password:"
              id="standard-basic"
              variant="outlined"
              type="password"
            />

            <TextField
              margin="normal"
              inputRef={Phone_no}
              sx={{ width: "90%" }}
              label="Enter your Phone No:"
              id="standard-basic"
              variant="outlined"
            />

            <br />
            <div>
              <select ref={RegionId}>
                <option value="default" disabled selected>
                  Click to Select Distributor
                </option>
                {regionlist.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.FirstName}
                  </option>
                ))}
              </select>
            </div>

            <br />
            <Button
              sx={{ "& button": { m: 2 } }}
              size="large"
              variant="contained"
              type="submit"
            >
              Add
            </Button>
          </Box>
        </form>
      </div>
    </Scrollbars>
  );
};

export default CreateNewDispatch;
