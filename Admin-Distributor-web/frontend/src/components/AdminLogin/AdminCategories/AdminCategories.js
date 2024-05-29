import  { useRef } from "react";
import ConnectCategories from "./ConnectCategories";



const AdminCategories = () => {

  const category = useRef("");
 
  const refid='6300af4997dcffe28b32da99';

  const handlesubmit=()=>
  {
    alert("Form Filled Successfully");
  }


  return (
    <div className="Register">
      <h1 className="sherry">Add a Category</h1>
      <form onSubmit={handlesubmit} >
        <div>
          <input
            type="text"
            className="inputBox"
            placeholder="Enter the name of category:"
            ref={category}
            
          />
        
        </div>
        

        <button
          className="submitbutton"
          
          // disabled={(name.current.value === '' || email.current.value==='' || password.current.value==='')}
          onClick={() => {
          
             ConnectCategories(category.current.value,refid);
            }}
          
        >Submit</button>

      </form>
    </div>
  );
};
export default AdminCategories;



