// import React, { useRef, useState } from "react";
// import "./SignUp.css";
// import ConnectBackend from "./ConnectBackend";
// // import ConnectRegionapi from "../AdminLogin/ConnectRegionapi";


// // FirstName, LastName, Phone_no, password
// const SignUp = () => {
//   const First_name = useRef(null);
//   const Last_name=useRef(null);
//   const Phone_no = useRef(null);
//   const password = useRef(null);
 
//   // phone reg exp:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

//   const [firstnameerror, setNameError] = useState("");
//   const [lastnameerror, setLastNameError] = useState("");
//   const [phoneNoerror, setphoneerror] = useState("");
//   const [passworderror, setpassworderror] = useState("");
//   const [buttonStatus, setButtonStatus] = useState(true);

//   //validating name here
//   const firstnameemptyvalidation = (name) => {
   
//     const reg = /^[a-zA-Z ]*$/;
//     if (reg.test(name) === false) {
//       setNameError("Enter valid name");
//       setButtonStatus(true);
    
//     }
//    else if (name.trim().length== 0 )
//     {
//       setNameError("First Name can't be empty");
//       setButtonStatus(true);
//     }    
    
//     else {
//       setNameError(" ");
//       setButtonStatus(false);
//     }
//   };

//   const Lastnameemptyvalidation = (name) => {
//     // setNameError(!!e);
//     const reg = /^[a-zA-Z ]*$/;
//     if (reg.test(name) === false) {
//       setLastNameError("Enter valid name");
//       setButtonStatus(true);
    
//     }
//    else if (name.trim().length== 0 )
//     {
//       setLastNameError("Last Name can't be empty");
//       setButtonStatus(true);
//     }    
    
//     else {
//       setLastNameError(" ");
//       setButtonStatus(false);
//     }
//   };


//   //validating email here
//   const phoneemptyvalidation = (phone) => {

//     const regemail =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
//     if (phone.trim().length== 0 )
//     {
//       setphoneerror("Phone No can't be empty");
//       setButtonStatus(true);
//     }    
//     else if (regemail.test(phone) === false) {
//       setphoneerror("enter valid phone number");
//       setButtonStatus(true);
//     }
    
//      else {
//       setphoneerror(" ");
//       setButtonStatus(false);
//     }
//   };

//   const passwordemptyvalidation=(e)=>
//   {
//     if (e.trim().length== 0)
//     {
//       setpassworderror("Password can't be empty");
//       setButtonStatus(true);
  
//       // console.log("passwod is empty")
//     }  
//   }
  

//   const Submitt = (e) => {
//     alert("Retailler signed in Successfully");
//     e.preventdefault();
//   };

//   return (
//     <div className="Register">
//       <h3 className="sherry">User Registeration</h3>
//       <form onSubmit={Submitt}>
//         <div>
//           <input
//             type="text"
//             className="inputBox"
//             placeholder="Enter First name :"
//             ref={First_name}
//             onBlur={(e) => firstnameemptyvalidation(e.target.value)}
//             disabled={First_name===null}
//           />
//           {firstnameerror ? <span className="text-danger">{firstnameerror}</span> : null}
//         </div>
//         <div>
//           <input
//             type="text"
//             className="inputBox"
//             placeholder="Enter Last name :"
//             ref={Last_name}
//             onBlur={(e) => Lastnameemptyvalidation(e.target.value)}
//             disabled={Last_name===null}
//           />
//           {lastnameerror ? <span className="text-danger">{lastnameerror}</span> : null}
//         </div>

//         <div>
//           <input
//             type="text"
//             className="inputBox"
//             placeholder="Enter Phone No :"
//             ref={Phone_no}
//             onBlur={(email) => phoneemptyvalidation(email.target.value)}
//             disabled={Phone_no===null}
//           />
//          {phoneNoerror ? <span className="text-danger">{phoneNoerror}</span> : null}
//         </div>
//         <input
//           type="password"
//           className="inputBox"
//           placeholder="Enter password:"
//           ref={password}
//           disabled={password==null}
//           onBlur={(e) => passwordemptyvalidation(e.target.value)}
//         />
//           {passworderror ? <span className="text-danger">{passworderror}</span> : null}
       

//          {/* {!passworderror && <span className="text-danger"> password can not be empty </span> } */}

//         <button
//           className="submitbutton"
//           disabled={buttonStatus}
//           // disabled={(name.current.value == null || email.current.value==null || password.current.value==null)}
//           onClick={() => {
//             ConnectBackend(
//              First_name.current.value,
//              Last_name.current.value,
//              Phone_no.current.value,
//              password.current.value
//             );
//             // ConnectRegionapi(region.current.value,capital.current.value);
//             }}
          
//         >Submit</button>

//       </form>
//     </div>
//   );
// };
// export default SignUp;


// //  disabled={name.current.value === '' || email.current.value==='' || password.current.value===''}
