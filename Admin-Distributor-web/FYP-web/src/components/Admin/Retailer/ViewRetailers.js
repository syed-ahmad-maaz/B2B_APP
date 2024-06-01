import React from 'react';
import { GetListOfRetailers } from '../../../services/Retailer';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./ViewRetailer.css"

const ViewRetailerList=()=>
{
    const [retailers, getretailers] = useState([]);
    const [_id, setId] = useState("");
    const navigate = useNavigate();
    const RetailerList = () => {
        GetListOfRetailers().then((items) => {
          getretailers(items);
        });
      };
      useEffect(() => {
        if (!localStorage.getItem("admintoken")) {
          navigate("/adminlogin");
        }
    
        RetailerList();
      }, []);
    return(
        <div>
         <Scrollbars style={{ height: 510 }}>
        <h3>
        <b id='mexico'>View Registered Retailer Here</b>
      </h3>
   
   
        <Table striped variant="light" className="table text-left">
          <tr>
          <td>
              <b>Retailer Id</b>
            </td>
            <td>
              <b>First Name</b>
            </td>
            <td>
              <b>Last Name</b>
            </td>
            <td>
              <b>Phone No</b>
            </td>
            </tr>
            {Array.isArray(retailers) ? (
            retailers.map((item, i) => (
              <tr key={i} > 
              <td>{item._id}</td>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Phone_no}</td>
              
              </tr>
            ))
          ) : (
            <></>
          )}
          </Table>
          </Scrollbars>


        </div>
    );

}
export default ViewRetailerList;