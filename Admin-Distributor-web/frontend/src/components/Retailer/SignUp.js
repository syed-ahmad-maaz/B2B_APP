import React, { useRef, useState } from "react";
import "./SignUp.css";
import ConnectBackend from "./ConnectBackend";
// import ConnectRegionapi from "../AdminLogin/ConnectRegionapi";

const SignUp = () => {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
 

  const [nameerror, setNameError] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [passworderror, setpassworderror] = useState("");
  const [buttonStatus, setButtonStatus] = useState(true);

  //validating name here
  const nameemptyvalidation = (name) => {
    // setNameError(!!e);
    const reg = /^[a-zA-Z ]*$/;
    if (reg.test(name) === false) {
      setNameError("Enter valid name");
      setButtonStatus(true);
    
    }
   else if (name.trim().length== 0)
    {
      setNameError("Name can't be empty");
      setButtonStatus(true);
    }    
    
    else {
      setNameError(" ");
      setButtonStatus(false);
    }
  };

  //validating email here
  const emailemptyvalidation = (email) => {

    const regemail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (email.trim().length== 0)
    {
      setemailerror("Email  can't be empty");
      setButtonStatus(true);
    }    
    else if (regemail.test(email) === false) {
      setemailerror("enter valid email address");
      setButtonStatus(true);
    }
    
     else {
      setemailerror(" ");
      setButtonStatus(false);
    }
  };

  const passwordemptyvalidation=(e)=>
  {
    if (e.trim().length== 0)
    {
      setpassworderror("Password can't be empty");
      setButtonStatus(true);
  
      // console.log("passwod is empty")
    }  
  }
  

  // const Submitt = (e) => {
  //   e.preventdefault();
  // };

  return (
    <div className="Register">
      <h1 className="sherry">User Registeration</h1>
      <form >
        <div>
          <input
            type="text"
            className="inputBox"
            placeholder="Enter name :"
            ref={name}
            onBlur={(e) => nameemptyvalidation(e.target.value)}
          />
          {nameerror ? <span className="text-danger">{nameerror}</span> : null}
        </div>
        <div>
          <input
            type="text"
            className="inputBox"
            placeholder="Enter Email address :"
            ref={email}
            onBlur={(email) => emailemptyvalidation(email.target.value)}
          />
         {emailerror ? <span className="text-danger">{emailerror}</span> : null}
        </div>
        <input
          type="password"
          className="inputBox"
          placeholder="Enter password:"
          ref={password}
          onBlur={(e) => passwordemptyvalidation(e.target.value)}
        />
          {passworderror ? <span className="text-danger">{passworderror}</span> : null}
        <br></br>
       

         {/* {!passworderror && <span className="text-danger"> password can not be empty </span> } */}

        <button
          className="submitbutton"
          disabled={buttonStatus}
          // disabled={(name.current.value == null || email.current.value==null || password.current.value==null)}
          onClick={() => {
            ConnectBackend(
             name.current.value,
             email.current.value,
             password.current.value
            );
            // ConnectRegionapi(region.current.value,capital.current.value);
            }}
          
        >Submit</button>

      </form>
    </div>
  );
};
export default SignUp;


//  disabled={name.current.value === '' || email.current.value==='' || password.current.value===''}
