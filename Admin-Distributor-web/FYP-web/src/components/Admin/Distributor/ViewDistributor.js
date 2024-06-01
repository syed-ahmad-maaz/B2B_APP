import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetRegionList } from "../../../services/Regions";
import { GetDistributorList } from "../../../services/Distributor";
import { Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import Swal from "sweetalert2";
import { BlockDistributorbyAdmin } from "../../../services/Distributor";
import { UnBlockDistributorbyAdmin } from "../../../services/Distributor";

const ViewAllDistributor = () => {
  const [regions, setregionstate] = useState([]);

  const navigate = useNavigate();

  const ListOfRegions = () => {
    GetDistributorList().then((items) => {
      setregionstate(items);
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
    ListOfRegions();
  }, []);

  const BlockDistributor = (_id) => {
    let item = { _id };

    BlockDistributorbyAdmin(item);
  };

  const UnBlockDistributor = (_id) => {
    let item = { _id };

    UnBlockDistributorbyAdmin(item);
  };

  return (
    <Scrollbars style={{ height: 520 }}>
      <div>
        <b className="biscuit">List of All Distributors</b>
        <br></br>

        <Table striped variant="light" className="table text-center">
          <tr>
            <td>
              <b>Admin Name</b>
            </td>

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
              <b>Operation</b>
            </td>
            <td>
              <b>Operation</b>
            </td>
          </tr>

          {Array.isArray(regions) ? (
            regions.map((item, i) => (
              <tr key={i}>
                <td>{item.AdminId.name}</td>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Email}</td>

                <td>
                  <Button
                    onClick={() => BlockDistributor(item._id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "2px",
                      padding: "9px 16px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Block
                  </Button>
                </td>

                <td>
                  <Button onClick={() => UnBlockDistributor(item._id)}
                   style={{
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "2px",
                      padding: "8px 13px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}>
                    UnBlock
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </Table>
        <br></br>
      </div>
    </Scrollbars>
  );
};

export default ViewAllDistributor;
