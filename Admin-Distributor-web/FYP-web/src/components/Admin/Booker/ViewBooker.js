import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2';
import {GetAllBookerList} from '../../../services/Booker'

export const ViewBooker = () => {
    const [booker, setbookerstate] = useState([]);

  const navigate = useNavigate();

  const ListOfbookers = () => {
    GetAllBookerList().then((items) => {
      setbookerstate(items);
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
    ListOfbookers();
  }, []);
 

  return (
    <Scrollbars style={{ height: 520 }}>
      <div>
        <b className="biscuit">View All bookers </b>
        <br></br>

        <Table striped variant="light" className="table text-center">
          <tr>
            <td>
              <b>Admin Name</b>
            </td>
            <td>
              <b>Booker Name</b>
            </td>
            <td>
              <b>Email</b>
            </td>
            <td>
              <b>Phone No</b>
            </td>
           
          </tr>

          {Array.isArray(booker) ? (
            booker.map((item, i) => (
              <tr key={i}>
                <td>{item.AdminId.name}</td>
                <td>{item.FirstName} {item.LastName}</td>
                <td>{item.Email}</td>
                <td>{item.Phone_no}</td>
               
             
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
}

