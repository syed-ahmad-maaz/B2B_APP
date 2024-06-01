import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewOrder.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import { GetListOfOrder } from "../../../services/Orders";
import { AcceptedStatusThroughDropDown } from "../../../services/Orders";
import { RejectedStatusofOrder } from "../../../services/Orders";
import React from "react";

import Button from "@mui/material/Button";

import { Table } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";

const ViewOrder = () => {
  const [order, setorder] = useState([]);
  const [_id, setId] = useState("");
  const navigate = useNavigate();
  const [OrderStatus, setOrderstatus] = useState("");

  const OrderList = () => {
    GetListOfOrder().then((items) => {
      setorder(items);
    });
  };
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }

    OrderList();
  }, []);

  const AcceptedStatus = (_id, OrderStatus) => {
    let item = { _id, OrderStatus };

    Swal.fire({
      title: OrderStatus + " is the selected status?",
      text: "Are you sure to change the order status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AcceptedStatusThroughDropDown(item);
        Swal.fire(
          "Successfully Updated!",
          `${OrderStatus}  is the current status now..`,
          "success"
        ).then(function () {
          window.location.href = "/viewOrder";
        });
        OrderList();
      }
    });
  };
  const RejectedStatus = (_id) => {
    Swal.fire({
      title: " Reject is the selected status?",
      text: "Are you sure to change the order status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        RejectedStatusofOrder(_id);
        Swal.fire(
          "Successfully Updated!",
          `Reject is the current status now..`,
          "success"
        ).then(function () {
          window.location.href = "/viewOrder";
        });
        OrderList();
      }
    });
    OrderList();
  };

  return (
    <Scrollbars style={{ height: 518 }}>
      <div>
        <b className="biscuit">View all orders details</b>
        <Table striped variant="light" className="table text-center">
  <thead>
    <tr>
      <th>
        <b>Retailer Name</b>
      </th>
      <th>
        <b>Order Amount</b>
      </th>
      <th>
        <b>Order Status</b>
      </th>
      <th>
        <b>All Ordered Product Information</b>
      </th>
      <th>
        <b>Change Order Status</b>
      </th>
      <th>
        <b>Confirm Status</b>
      </th>
    </tr>
  </thead>
  <tbody className="styling">
    {Array.isArray(order) ? (
      order.map((item, i) => (
        <React.Fragment key={i}>
          <tr>
            <td>
              {item.UserId.FirstName} {item.UserId.LastName}
            </td>
            <td>{item.OrderTotal}</td>
            <td>{item.OrderStatus}</td>
            <td>
              {item.ProductId.map((detail, key) => (
                <React.Fragment key={key}>
                  <div>
                    <b>Name:</b> {detail.productname}
                    <br />
                    <b>Price:</b> {detail.productprice}
                    <br />
                    {/* <b>Brand:</b> {detail.productbrand}
                    <br /> */}
                    <b>Quantity:</b> {detail.quantity}
                    <br />
                  </div>
                </React.Fragment>
              ))}
            </td>
         
            <td>
              <div className="select select-right">
                <select
                  name="format"
                  id="format"
                  className="status-select"
                  onChange={(e) => setOrderstatus(e.target.value)}
                >
                  <option disabled>Select Status</option>
                  <option value="Processing">Processing</option>
                  <option value="To be Delivered">To be Delivered</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
              </div>
            </td>
            <td>
              <div className="button-container">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => AcceptedStatus(item._id, OrderStatus)}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => RejectedStatus(item._id)}
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="6">
              <Divider sx={{ backgroundColor: "black" }} />
            </td>
          </tr>
        </React.Fragment>
      ))
    ) : (
      <></>
    )}
  </tbody>
</Table>


      </div>
    </Scrollbars>
  );
};
export default ViewOrder;
