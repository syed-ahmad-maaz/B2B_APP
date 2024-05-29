import "./ViewCategory.css";
import React,{useEffect,useState} from 'react';
const ViewCategory=()=>
{
    const [category,setcategoryarray]=useState([])
    const [category_name, setcategory] = useState("")
    const [_id, setId] = useState("");
    useEffect(()=>{
  
        GetListOfCategory();
        
       },[])
       // console.warn(users)
      const GetListOfCategory=()=>
       {
         fetch("http://localhost:5000/category").then((result)=>{
           result.json().then((resp)=>{
             // setUser(resp)
             
             setcategoryarray(resp.categorydata);
             // setRegion(resp.regiondata[3].region)
             // setCapital(resp.regiondata[3].capital)
             console.warn(resp);
          })
         })
       }
       const deleteCategory = (_id) => {
        // ,{method: 'DELETE'}
        fetch(`http://localhost:5000/category/${_id}`, { method: "DELETE" }).then(
          (result) => {
            result.json().then((response) => {
              console.warn("Deleted!!" + response);
              GetListOfCategory();
            });
          }
        );
      };
      function selectCategory(categoryfields) {
        console.warn("Your data is ", categoryfields);
        // _id='6300b16794ed450d48cc6344';
        // console.log("hellooo function called");
        // regions[regionsfields-1]
    
        setcategory(categoryfields.category_name);
       setId(categoryfields._id);
      }
      const updateCategory = () => {
        // console.warn(region,capital,_id);
        let item = { category_name, _id };
        console.warn("item", item);
        fetch(`http://localhost:5000/category/${_id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }).then((result) => {
          result.json().then((resp) => {
            console.warn(resp);
           GetListOfCategory();
          });
        });
      };
       return (
        <div>
          <h1>
            <b>View Category Here</b>
          </h1>
          <br></br>
          <br></br>
          <table border="1" className="center">
            <tbody className="styling">
              <tr>
                <td>
                  <b className="special">RegionID</b>
                </td>
                <td>
                  <b className="special">Category</b>
                </td>
                <td>
                  <b className="special">AdminId</b>
                </td>
                <td>
                  <b className="special">Operation</b>
                </td>
                <td>
                  <b className="special">Operation</b>
                </td>
              </tr>
              {Array.isArray(category) ? (
                category.map((item, i) => (
                  <tr key={i}>
                    <td>{item._id}</td>
                    <td>{item.category_name}</td>
                    <td>{item.AdminId}</td>
                    <td>
                  <button  onClick={() => deleteCategory(item._id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => selectCategory(item)} >Update</button>
                </td>
                   </tr>
                ))
              ) : (
                <></>
              )}</tbody></table>

              <br></br>

<div class="center">
  <form>
    <b>Region:</b>
    <div class="txt_field">
      <input
        type="text"
        value={category_name}
        onChange={(e) => {
        setcategory(e.target.value)
        }}
      />
     
      <span></span>
      <br></br>
    </div>
  </form>
  <br></br>
  <button className="fun" onClick={updateCategory}>Click to Update</button>
</div>
</div>
         
        
);
        
      
 



}
export default ViewCategory;