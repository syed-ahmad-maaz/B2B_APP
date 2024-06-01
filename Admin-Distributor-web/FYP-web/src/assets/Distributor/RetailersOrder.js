import React from "react";
import DashboardContent from "./Dashboard";
import Box from "@mui/material/Box";
import { SpecificRetailersOrders } from "../../services/Orders";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { GetDispatcherList } from "../../services/Dispatch";
import { AssignedDispatchService } from "../../services/Orders";
import { Button } from "@mui/material";
import e from "../../View/empty-cart.png";
import Footer from "./Footer/Footer";

export const OrdersBySpecificRetailers = () => {
  const [retailers, getretailers] = useState([]);
  const [dispatcher, getdispatcher] = useState([]);
  const DispatcherId = useRef(null);
  const [_id, setId] = useState("");
  const navigate = useNavigate();

  const Orderlist = () => {
    SpecificRetailersOrders().then((items) => {
      getretailers(items);
    });
    GetDispatcherList().then((items) => {
      getdispatcher(items);
    });
  };
  useEffect(() => {
    if (!localStorage.getItem("DistributorToken")) {
      navigate("/");
    }

    Orderlist();
  }, []);
  const UpdateDispatch = (_id, DispatcherId) => {
    console.log("update dispatchhh");

    let item = { _id, DispatcherId };

    AssignedDispatchService(item);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <DashboardContent />

        <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
          {Array.isArray(retailers) && retailers.length > 0 ? (
            <>
              <h1>Registered Orders by retailers</h1>
              <Table striped variant="light">
                <thead>
                  <tr>
                    <th>Retailer Name</th>
                    <th>Order Total</th>
                    <th>Order Status</th>
                    <th>Order Quantity</th>
                    <th>Product Name</th>
                    <th>Dispatchers</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(retailers) ? (
                    retailers.map((item, i) => (
                      <tr key={i}>
                        <td>
                          {item.UserId.FirstName} {item.UserId.LastName}
                        </td>
                        <td>{item.OrderTotal}$</td>
                        <td>{item.OrderStatus}</td>
                        <td>{item.Order_Quantity}</td>
                        <td>
                          {item.ProductId.map((detail, key) => (
                            <div key={key}>{detail.productname}</div>
                          ))}
                        </td>
                        <td>
                          <div>
                            <select ref={DispatcherId}>
                              <option selected disabled>
                                Select Dispatchers
                              </option>

                              {dispatcher.map((disp) => (
                                <option key={disp._id} value={disp._id}>
                                  {disp.FirstName} {disp.LastName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        <td>
                          <Button
                            variant="contained"
                            onClick={() =>
                              UpdateDispatch(
                                item._id,
                                DispatcherId.current.value
                              )
                            }
                          >
                            Assigned
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </Table>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center">
                <h2>No orders till now!</h2>
                <img src={e} alt="./empty-cart.png" height="460" />
              
              </div>
              
            </>
          )}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};
