import React from 'react';
import  { useRef, useState} from "react";
import "./Login.css";
import LoginBackend from './LoginBackend';


const Login =()=>
{
    const email=useRef("");
    const password=useRef("");
    const [emailerror,setemailerror]=useState(true);
    const [buttonStatus, setButtonStatus] = useState(true);

    const emailemptyvalidation = (email) => {
         const regemail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
         if (regemail.test(email) === false) {
          setemailerror("Enter Valid email address");
          setButtonStatus(true);
        } else {
          setemailerror(" ");
          setButtonStatus(false);
        }
    };
    const handlesubmit = (e) => {
 
        
        alert("Login SuccessFully at frontend");
        console.log("Frontend done Successfully");
        e.preventDefault();
      
      };


    return(
        
        <div className="master">
        <h3>Login to your Account</h3>
         <form onSubmit={handlesubmit}>
         <input
          type="text"
          className="inputBox"
          placeholder="Enter Email Please :"
          ref={email}
          name="email"
          onBlur={(e) => emailemptyvalidation(e.target.value)}
         />
         {emailerror ? <span className="text-danger">{emailerror}</span> : null}
         <input
          type="password"
          className="inputBox"
          placeholder="Enter password Please:"
          ref={password}
          name="password"
      />
      <button  className="appButton" disabled={buttonStatus}
       onClick={() => LoginBackend(email.current.value,password.current.value) } >Submit</button>
      </form>
      </div>
      

    );
}
export default  Login;
