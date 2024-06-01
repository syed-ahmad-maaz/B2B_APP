
import { GetAllDispatcherList } from '../../../services/Distributor';
import DashboardContent from '../Dashboard';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import DistributorFooter from '../Footer/Footer'
import Footer from '../Footer/Footer';

export const ViewDispatchers = () => {
  const [dispatcher, setdispatcherstate] = useState([]);

  const navigate = useNavigate();
  const ListOfDispatchers = () => {
    GetAllDispatcherList().then((items) => {
      setdispatcherstate(items);
     
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("DistributorToken")) {
      navigate("/");
    }
    ListOfDispatchers();
    console.log("hello",dispatcher);
  }, []);
  const LoadDispatchers = (item) => {
   
    
    localStorage.setItem("ID", item._id);
    localStorage.setItem("FirstName", item.FirstName);
    localStorage.setItem("LastName", item.LastName);
    localStorage.setItem("Email", item.Email);
    localStorage.setItem("Password", item.password);
    localStorage.setItem("Phone No", item.Phone_no);


    
  };
  return (
    <div>
    <Box sx={{ display: 'flex' }}>

   <DashboardContent />
 
   <Box component="main" sx={{flexGrow:1 , p:10}}>

   <h1>Registered Dispatchers</h1>

 


  <Table striped variant="light" >
    <tr>
    <td>
        <b>Distributor Name</b>
      </td>
      <td>
        <b>Dispatcher Name</b>
      </td>
      <td>
        <b>Email</b>
      </td>
      <td>
        <b>Phone No</b>
      </td>
      <td>
        <b>Operation</b>
      </td>
      </tr>
      {Array.isArray(dispatcher) ? (
        dispatcher.map((item, i) => (
          <tr key={i}>
            <td>{item.DistributorId.FirstName} {item.DistributorId.LastName}</td>
            <td>{item.FirstName} {item.LastName}</td>
            <td>{item.Email}</td>
            <td>{item.Phone_no}</td>
            <td>
          
                  <Link to={"/updatedispatchbydistributor/" + item._id}>
                    <Button
                      sx={{ color: "success.main" }}
                      onClick={() => LoadDispatchers(item)}
                    
                    >
                      <EditIcon />
                    </Button>
                  </Link>
                 
                </td>
           
      
          </tr>
        ))
      ) : (
        <></>
      )}
    </Table>
  
    </Box>

  </Box>
 <Footer />

  </div>
  )
}
