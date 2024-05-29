import  { useRef } from "react";
import ConnectProduct from "./ConnectProduct";



const AdminProduct = () => {

  const name = useRef("");
  const price=useRef("");
  const brand_name=useRef("");
  const Admin_refid='6300af4997dcffe28b32da99';
  const Category_refid="6300f62998af40d93af2c6a5";
 
  

  const handlesubmit=()=>
  {
    alert("Form Filled Successfully");
  }


  return (
    <div className="Register">
      <h1 className="sherry">Add a Product</h1>
      <form onSubmit={handlesubmit} >
        <div>
          <input
            type="text"
            className="inputBox"
            placeholder="Enter the name of product:"
            ref={name}
            
          />
        
        </div>
        <div>
          <input
            type="text"
            className="inputBox"
            placeholder="Enter the price of product:"
            ref={price}
            
          />
        
        </div>
        <div>
          <input
            type="text"
            className="inputBox"
            placeholder="Enter the brand name of product:"
            ref={brand_name}
            
          />
        
        </div>

        <button
          className="submitbutton"
          
          // disabled={(name.current.value === '' || email.current.value==='' || password.current.value==='')}
          onClick={() => {
          
             ConnectProduct(name.current.value,price.current.value,brand_name.current.value,Admin_refid,Category_refid);
            }}
          
        >Submit</button>

      </form>
    </div>
  );
};
export default AdminProduct;



