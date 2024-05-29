import { useState,useEffect} from "react";
import './ViewProduct.css';

const ViewProduct=()=>
{
    const [product,setprodut]=useState([]);
    const [name,setname]=useState("")
    const [price,setprice]=useState("");
    const [brand_name,setbrandname]=useState("")
    const [_id, setId] = useState("");

    useEffect(()=>{
  
        GetListOfProduct();
        
       },[])
       // console.warn(users)
      const GetListOfProduct=()=>
       {
         fetch("http://localhost:5000/product").then((result)=>{
           result.json().then((resp)=>{
             // setUser(resp)
             
             setprodut(resp.productdata);
             // setRegion(resp.regiondata[3].region)
             // setCapital(resp.regiondata[3].capital)
             console.warn(resp);
          })
         })
       }
       const deleteProduct = (_id) => {
        // ,{method: 'DELETE'}
        fetch(`http://localhost:5000/product/${_id}`, { method: "DELETE" }).then(
          (result) => {
            result.json().then((response) => {
              console.warn("Deleted!!" + response);
              GetListOfProduct();
            });
          }
        );
      };
      function selectProduct(productfields) {
        console.warn("Your data is ", productfields);
        // _id='6300b16794ed450d48cc6344';
        // console.log("hellooo function called");
        // regions[regionsfields-1]
    
        setname(productfields.name);
        setprice(productfields.price);
        setbrandname(productfields.brand_name);
        setId(productfields._id);

      }
      const updateProduct = () => {
        // console.warn(region,capital,_id);
        let item = { name,price,brand_name, _id };
        console.warn("item", item);
        fetch(`http://localhost:5000/product/${_id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }).then((result) => {
          result.json().then((resp) => {
            console.warn(resp);
           GetListOfProduct();
          });
        });
      };
      return (
        <div>
          <h1>
            <b>View Added Product Here</b>
          </h1>
          <br></br>
          <br></br>
          <table border="1" className="center">
            <tbody className="styling">
              <tr>
                <td>
                  <b className="special">ProductID</b>
                </td>
                <td>
                  <b className="special">Name</b>
                </td>
                <td>
                  <b className="special">Price</b>
                </td>
                <td>
                  <b className="special">Brand-Name</b>
                </td>
                <td>
                  <b className="special">AdminId</b>
                </td>
                <td>
                  <b className="special">CategoryID</b>
                </td>
                <td>
                  <b className="special">Operation</b>
                </td>
                <td>
                  <b className="special">Operation</b>
                </td>
              </tr>
              {Array.isArray(product) ? (
                product.map((item, i) => (
                  <tr key={i}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.brand_name}</td>
                    <td>{item.AdminId}</td>
                    <td>{item.CategoryId}</td>
                
                    <td>
                  <button  onClick={() => deleteProduct(item._id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => selectProduct(item)} >Update</button>
                </td>
                   </tr>
                ))
              ) : (
                <></>
              )}</tbody></table>

              <br></br>
             
<div class="center">
  <form>
 
    <div class="txt_field">
    <b>Name:</b>
      <input
        type="text"
        value={name}
        onChange={(e) => {
        setname(e.target.value)
        }}
      />
      <b>Price:</b>
        <input
        type="text"
        value={price}
        onChange={(e) => {
        setprice(e.target.value)
        }}
      />
      <b>Brand-Name</b>
        <input
        type="text"
        value={brand_name}
        onChange={(e) => {
        setbrandname(e.target.value)
        }}
      />
     
      <span></span>
      <br></br>
    </div>
  </form>
  <br></br>
  <button className="fun" type="submit" onClick={updateProduct}>Click to Update</button>
</div>
</div>
         
        
);
        
      
 

}
export default ViewProduct;