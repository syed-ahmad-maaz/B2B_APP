import React from "react";
import { useRef } from "react";
import AdminBackend from "./AdminBackend";
import "./AdminLogin.css";

const AdminLogin = () => {
  
    const name=useRef("");
    const password=useRef("");
 
  const handlesubmit = (e) => {
    alert("Admin Login SuccessFully at frontend");

    e.preventDefault();
  };

  return (
    <div className="master">
      <h3>Admin Login Here</h3>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          className="inputBox"
          placeholder="Enter Name Please :"
          ref={name}
          name="name"
         
        
        />
        {/* {emailerror ? <span className="text-danger">{emailerror}</span> : null} */}
        <input
          type="password"
          className="inputBox"
          placeholder="Enter password Please:"
          ref={password}
        />
        <button
          className="appButton"
        //   disabled={buttonStatus}
          onClick={() =>
            AdminBackend(name.current.value,password.current.value)
          }
        >
          Submit
        </button>
        
      </form>
    </div>
  );
};
export default AdminLogin;
