import React from "react";
import { ListofAllRetailersforDistributor } from "../../../services/Distributor";
// import { GetListOfRetailers } from '../../../services/Retailer';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import DashboardContent from "../Dashboard";
import Box from "@mui/material/Box";
import Footer from "../Footer/Footer";

export const ViewRetailerforDistributor = () => {
  const [retailers, getretailers] = useState([]);
  // const [_id, setId] = useState("");
  const navigate = useNavigate();
  const RetailerList = () => {
    ListofAllRetailersforDistributor().then((items) => {
      getretailers(items);
    });
  };
  useEffect(() => {
    if (!localStorage.getItem("DistributorToken")) {
      navigate("/");
    }

    RetailerList();
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <DashboardContent />
        {/* <Scrollbars style={{ height: 510 }}> */}
          <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
            <h1>Registered Retailers</h1>

            <Table striped variant="light" className="table text-left">
              <tr>
                <td>
                  <b>First Name</b>
                </td>

                <td>
                  <b>Last Name</b>
                </td>
                <td>
                  <b>Email</b>
                </td>
                <td>
                  <b>Phone No</b>
                </td>
              </tr>
              {Array.isArray(retailers) ? (
                retailers.map((item, i) => (
                  <tr key={i}>
                    <td>{item.FirstName}</td>

                    <td>{item.LastName}</td>
                    <td>{item.Email}</td>
                    <td>{item.Phone_no}</td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </Table>
          </Box>
        {/* </Scrollbars> */}
      </Box>
      <Footer/>
    </div>
  );
};
