import  { useRef } from "react";
// import "./SignUp.css";
// import ConnectBackend from "./ConnectBackend";
import ConnectRegionapi from "./ConnectRegionapi";

const AdminRegion = () => {

  const region = useRef("");
  const capital=useRef("");
  const refid='6300af4997dcffe28b32da99';

  
const handlesubmit=()=>
{
    alert("Data Sent Successfully");
}
  

  return (
    <div className="Register">
      <h1 className="sherry">Admin-Region</h1>
      <form onSubmit={handlesubmit} >
        <div>
          <input
            type="text"
            className="inputBox"
            placeholder="Enter region :"
            ref={region}
            
          />
        
        </div>
        <div>
          <input
            type="text"
            className="inputBox"
            placeholder="Enter capital :"
            ref={capital}
           
          />
       
        </div>
       
       

        <button
          className="submitbutton"
          
          // disabled={(name.current.value === '' || email.current.value==='' || password.current.value==='')}
          onClick={() => {
          
             ConnectRegionapi(region.current.value,capital.current.value,refid);
            }}
          
        >Submit</button>

      </form>
    </div>
  );
};
export default AdminRegion;


//  disabled={name.current.value === '' || email.current.value==='' || password.current.value===''}
