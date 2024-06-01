import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { CreateDistributor } from "../../services/Distributor";
import { CreateBooker } from "../../../services/Booker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { GetRegionList } from "../../../services/Regions";
import { Scrollbars } from "react-custom-scrollbars-2";

import swal from "sweetalert";

const CreateNewBooker = () => {
  const FirstName = useRef(null);
  let LastName = useRef(null);
  let Email = useRef(null);
  let Password = useRef(null);
  let Phone_no = useRef(null);
  const [regionlist, setregionlist] = useState([]);
  const [firstnameerror, setfirstnameerror] = useState("");
  const [secondnameerror, setsecondnameerror] = useState("");
  const [passwordrror, setpassworderror] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [phoneerror, setphoneerror] = useState("");

  const RegionId = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
    GetRegionList().then((items) => {
      setregionlist(items);
    });
  }, []);
  const firstnamevalidation = (e) => {
    const reg = /^[a-zA-Z ]*$/;
    if (reg.test(e) === false) {
      setfirstnameerror("Enter Valid Fist Name");
    } else if (e.trim().length == 0) {
      setfirstnameerror("First Name can't be empty");
    } else if (e.trim().length <= 1) {
      setfirstnameerror("Enter at least 2 characters ");
    } else {
      setfirstnameerror("");
    }
  };
  const secondnamevalidation = (e) => {
    const reg = /^[a-zA-Z ]*$/;
    if (reg.test(e) === false) {
      setsecondnameerror("Enter Valid Last Name");
    } else if (e.trim().length == 0) {
      setsecondnameerror("Last Name can't be empty");
    } else if (e.trim().length <= 1) {
      setsecondnameerror("Enter at least 2 characters ");
    } else {
      setsecondnameerror("");
    }
  };
  const emailvalidation = (e) => {
    // const reg=/^[A-Z0-9_%+-]+@[A-Z0-9-]+.\.[A-Z]{2,4}$/i;
    const reg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.\.[A-Z]{2,4}$/i;
    if (reg.test(e) === false) {
      setemailerror("Enter Valid Email Please");
    } else if (e.trim().length == 0) {
      setemailerror("Email can't be empty");
    } else {
      setemailerror("");
    }
  };
  // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
  const passwordvalidation = (e) => {
    // const reg=/^[A-Z0-9_%+-]+@[A-Z0-9-]+.\.[A-Z]{2,4}$/i;
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i;
    if (reg.test(e) === false) {
      setpassworderror("Enter Valid password Please");
    } else if (e.trim().length == 0) {
      setpassworderror("Password can't be empty");
    } else {
      setpassworderror("");
    }
  };
  const phonevalidation = (e) => {
    // const reg=/^[A-Z0-9_%+-]+@[A-Z0-9-]+.\.[A-Z]{2,4}$/i;
    const reg = /^(\+92|0)\d{10}$/;
    if (reg.test(e) === false) {
      setphoneerror("Enter Valid phone no Please");
    } else {
      setphoneerror("");
    }
  };

  const handlesubmit = (e) => {
    if (
      FirstName.current.value == "" &&
      LastName.current.value == "" &&
      Email.current.value == "" &&
      Password.current.value == "" &&
      Phone_no.current.value == "" &&
      RegionId.current.value == ""
    ) {
      swal({
        icon: "error",
        title: "Oops...Empty Booker Credentials",
        text: "Please fill all the fields!",
      });
      return;
    }
    if (FirstName.current.value == "") {
      swal({
        icon: "error",
        title: "Oops...First Name can not be empty",
        text: "Empty fields are not allowed please fill all the fields!",
      });
      return;
    }
    if (LastName.current.value == "") {
      swal({
        icon: "error",
        title: "Oops...Last Name can not be empty",
        text: "Please fill the last name field!",
      });
      return;
    }
    if (Email.current.value == "") {
      swal({
        icon: "error",
        title: "Oops...Email can not be empty",
        text: "Please fill the email field!",
      });
      return;
    }
    if (Password.current.value == "") {
      swal({
        icon: "error",
        title: "Oops...Password can not be empty",
        text: "Please fill the password field!",
      });
      return;
    }
    if (Phone_no.current.value == "") {
      swal({
        icon: "error",
        title: "Oops...Phone Number can not be empty",
        text: "Please fill the email field!",
      });
      return;
    }
    if (
      firstnameerror ||
      secondnameerror ||
      emailerror ||
      phoneerror ||
      passwordrror
    ) {
      swal({
        icon: "error",
        title: "Oopss...Validation Error",
        text: "Please fill all the fields as per format!",
      });
      return;
    }
    if (
      FirstName.current.value != "" &&
      LastName.current.value != "" &&
      Email.current.value != "" &&
      Password.current.value != "" &&
      Phone_no.current.value != "" &&
      firstnameerror == "" &&
      secondnameerror == "" &&
      emailerror == "" &&
      phoneerror == "" &&
      emailerror == "" &&
      passwordrror == ""
    ) {
      CreateBooker(
        FirstName.current.value,
        LastName.current.value,
        Email.current.value,
        Password.current.value,
        Phone_no.current.value,
        RegionId.current.value
      );
      swal(
        "Booker Created Successfully",
        "View your added booker by pressing ok",
        "success"
      );
      navigate("/allbookers");
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
            //  borderRadius={15}
          >
            <GroupAddIcon style={{ width: "20vw", height: "7vh" }} />
            <Typography
              variant="h4"
              textAlign="center"
              margin={1}
              className="iphone"
            >
              Add booker
            </Typography>
            <TextField
              margin="normal"
              inputRef={FirstName}
              sx={{ width: "90%" }}
              label="Enter your first name :"
              onBlur={(e) => firstnamevalidation(e.target.value)}
              id="standard-basic"
              variant="outlined"
            />
            {firstnameerror ? (
              <span className="text-danger">{firstnameerror}</span>
            ) : null}

            <TextField
              margin="normal"
              inputRef={LastName}
              sx={{ width: "90%" }}
              label="Enter your Last name ::"
              onBlur={(e) => secondnamevalidation(e.target.value)}
              id="standard-basic"
              variant="outlined"
            />
            {secondnameerror ? (
              <span className="text-danger">{secondnameerror}</span>
            ) : null}

            <TextField
              margin="normal"
              inputRef={Email}
              sx={{ width: "90%" }}
              label="Enter your email address"
              onBlur={(e) => emailvalidation(e.target.value)}
              id="standard-basic"
              variant="outlined"
            />
            {emailerror ? (
              <span className="text-danger">{emailerror}</span>
            ) : null}
            {/* Testing193!  */}
            {/* range 0-10  */}
            <TextField
              margin="normal"
              inputRef={Password}
              sx={{ width: "90%" }}
              label="Enter your password::"
              // onBlur={(e) => passwordvalidation(e.target.value)}
              id="standard-basic"
              variant="outlined"
                type="password"
            />

            {passwordrror ? (
              <span className="text-danger">{passwordrror}</span>
            ) : null}
            {/* <br></br> */}
            <TextField
              margin="normal"
              inputRef={Phone_no}
              sx={{ width: "90%" }}
              label="Enter your Phone No"
              onBlur={(e) => phonevalidation(e.target.value)}
              id="standard-basic"
              variant="outlined"
            />
            {phoneerror ? (
              <span className="text-danger">{phoneerror}</span>
            ) : null}
            <br></br>
            <div>
              <select ref={RegionId}>
                <option selected disabled>
                  Click to Select Regions
                </option>

                {regionlist.map((item) => (
                  <option value={item._id}>{item.region}</option>
                ))}
              </select>
              <br></br>
              <br></br>
            </div>

            <div></div>

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
export default CreateNewBooker;
