import React from "react";
import { GetDistributorRetailers } from "../../../services/Retailer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import DashboardContent from "../Dashboard";
import Box from "@mui/material/Box";
import Footer from "../Footer/Footer";

// Import your image


const ViewAllRetailerList = () => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("DistributorToken")) {
      navigate("/");
    }

    // Fetch the assigned retailers when the component mounts
    GetDistributorRetailers().then((items) => {
      setRetailers(items);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <DashboardContent />
        <Scrollbars style={{ height: 510 }}>
          <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
            <h1>Assigned Retailers</h1>
            {loading ? (
              <h2>Loading...</h2>
            ) : retailers.length === 0 ? (
              <>
                <p>No retailers assigned for this distributor.</p>
                {/* <img src={emptyCartImage} alt="Empty Cart" height="460" /> */}
              </>
            ) : (
              <>
                {retailers.map((item) => (
                  <div key={item._id}>
                 
                    {item.UserId.length === 0 ? (
                      <>
                        <p>No retailers assigned for this distributor.</p>
                        {/* <img src='./a.gif'  height="260" className="noretailers" /> */}
                      </>
                    ) : (
                      <Table striped variant="light">
                        <thead>
                          <tr>
                            <th>
                              <b>Retailer Id</b>
                            </th>
                            <th>
                              <b>First Name</b>
                            </th>
                            <th>
                              <b>Last Name</b>
                            </th>
                            <th>
                              <b>Phone No</b>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Map through the assigned retailers and their details */}
                          {item.UserId.map((detail) => (
                            <tr key={detail._id}>
                              <td>{detail._id}</td>
                              <td>{detail.FirstName}</td>
                              <td>{detail.LastName}</td>
                              <td>{detail.Phone_no}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                ))}
              </>
            )}
          </Box>
        </Scrollbars>
      </Box>
     <Footer />
    </div>
  );
};

export default ViewAllRetailerList;
