import React from "react";
import DashboardContent from "../Dashboard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GetDistributorList } from "../../../services/Distributor";
import { CreateDispatchbyDistributor } from "../../../services/Dispatch";
import DistributorFooter from "../Footer/Footer";
import "./Dispatch.css";
import Footer from "../Footer/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";


export const AddDispatch = () => {
  const navigate = useNavigate();
  const [regionlist, setregionlist] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("DistributorToken")) {
      navigate("/");
    }
    GetDistributorList().then((items) => {
      setregionlist(items);
    });
  }, []);

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[a-zA-Z]+$/, "First name must contain only alphabetic characters")
      .required("First name is required"),
    lastName: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Last name must contain only alphabetic characters")
      .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phoneNo: Yup.string()
      .required("Phone number is required")
      .test(
        "is-numeric",
        "Phone number must contain only numeric values",
        (value) => /^[0-9]+$/.test(value)
      ) .min(11, "Phone number must be exactly 11 digits")
      .max(11, "Phone number must be exactly 11 digits"),
    regionId: Yup.string().required("Region is required"),
  });
  

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNo: "",
      regionId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      CreateDispatchbyDistributor(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.phoneNo,
        values.regionId
      );
      navigate("/listofdispatch");
    },
  });

  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <DashboardContent />
        <Scrollbars style={{ height: 590 }}>
          <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
            <div>
              <form onSubmit={formik.handleSubmit}>
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
                    Add Dispatch
                  </Typography>
                  <TextField
                    margin="normal"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && formik.errors.firstName}
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    sx={{ width: "90%" }}
                    label="Enter your first name :"
                    id="firstName"
                    variant="outlined"
                  />

                  <TextField
                    margin="normal"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && formik.errors.lastName}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    sx={{ width: "90%" }}
                    label="Enter your Last name ::"
                    id="lastName"
                    variant="outlined"
                  />

                  <TextField
                    margin="normal"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{ width: "90%" }}
                    label="Enter your email address"
                    id="email"
                    variant="outlined"
                  />

                  <TextField
                    margin="normal"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && formik.errors.password}
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    sx={{ width: "90%" }}
                    label="Enter your password:"
                    id="password"
                    variant="outlined"
                    type="password"
                  />

                  <TextField
                    margin="normal"
                    name="phoneNo"
                    value={formik.values.phoneNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phoneNo && formik.errors.phoneNo}
                    helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                    sx={{ width: "90%" }}
                    label="Enter your Phone No"
                    id="phoneNo"
                    variant="outlined"
                    inputProps={{ inputMode: "numeric" }}
                  />

                  <br />
                  <div>
                    <select
                      name="regionId"
                      value={formik.values.regionId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.regionId && formik.errors.regionId}
                      helperText={
                        formik.touched.regionId && formik.errors.regionId
                      }
                      style={{ marginLeft: "1rem" }}
                    >
                      <option value="" disabled>
                        Click to Select Distributor
                      </option>

                      {regionlist.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item.FirstName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  <div></div>

                  <br />
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Button
                      sx={{ "& button": { m: 2 } }}
                      size="medium"
                      variant="contained"
                      type="submit"
                    >
                      Add Dispatch
                    </Button>
                    <Button
                      sx={{ "& button": { m: 2 } }}
                      size="medium"
                      variant="contained"
                      onClick={handleReset}
                    >
                      Reset Form
                    </Button>
                  </div>
                </Box>
              </form>
            </div>
          </Box>
          <Footer />
        </Scrollbars>
      </Box>
    </div>
  );
};
