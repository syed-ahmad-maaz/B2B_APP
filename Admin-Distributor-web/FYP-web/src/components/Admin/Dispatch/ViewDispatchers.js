import { DeleteDispatcher, GetDispatcherList } from '../../../services/Dispatch';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2';

export const ViewallDispatchers = () => {
    const [dispatcher, setdispatcherstate] = useState([]);

  const navigate = useNavigate();

  const ListOfDispatchers = () => {
    GetDispatcherList().then((items) => {
      setdispatcherstate(items);
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/adminlogin");
    }
    ListOfDispatchers();
  }, []);
  const deletedispatch=(item)=>
  {
    
    Swal.fire({
      title: item.FirstName +" " +  item.LastName  + ' wants to eliminate?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        DeleteDispatcher(item._id);
        Swal.fire(
          'Successfully Deleted!',
          `${item.FirstName} ${","} ${item.LastName}  record has been deleted.`,
          'success'
        )
        .then(function() {
          
          window.location.href = '/listofdispatchers';
         
         
        })
      
        
      }
    
    })
 
    ListOfDispatchers();
  
  }
  const LoadDispatchers = (item) => {
   
    
    localStorage.setItem("ID", item._id);
    localStorage.setItem("FirstName", item.FirstName);
    localStorage.setItem("LastName", item.LastName);
    localStorage.setItem("Email", item.Email);
    localStorage.setItem("Password", item.password);
    localStorage.setItem("Phone No", item.Phone_no);


    
  };

  return (
    <Scrollbars style={{ height: 520 }}>
      <div>
        <b className="biscuit">View All Dispatchers </b>
        <br></br>

        <Table striped variant="light" className="table text-center">
          <tr>
            {/* <td>
              <b>Admin Name</b>
            </td> */}
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
              <b>Operations</b>
            </td>
          </tr>

          {Array.isArray(dispatcher) ? (
            dispatcher.map((item, i) => (
              <tr key={i}>
                {/* <td>{item.AdminId.name}</td> */}
                <td>{item.FirstName} {item.LastName}</td>
                <td>{item.Email}</td>
                <td>{item.Phone_no}</td>
               
                <td>
                  <Link to={"/updatedispatch/" + item._id}>
                    <Button
                      sx={{ color: "success.main" }}
                      onClick={() => LoadDispatchers(item)}
                    
                    >
                      <EditIcon />
                    </Button>
                  </Link>
                 
                  
                  <Button
                  
                  
                  sx={{ color: "error.main" }}
                  onClick={() => deletedispatch(item)}
                 
                  
                >
                  <DeleteIcon />
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
}
