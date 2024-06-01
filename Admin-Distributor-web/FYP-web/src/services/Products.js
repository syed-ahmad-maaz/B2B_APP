export const AddProduct= async (name,price,brand_name,product_quantity,CategoryId,ProductImage)=>

 {
   const formData = new FormData();
   formData.append("name", name);
   formData.append("price", price);
   formData.append("brand_name", brand_name);
   formData.append("product_quantity", product_quantity);
   formData.append("CategoryId", CategoryId);
   formData.append("ProductImage", ProductImage, ProductImage.name);
     try {
    
    
     const response= await fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}product`,{
     
         method:'post',
         body:formData,
         headers:{
          
            Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
         }

     })
   
     if (!response.ok) {
    
         throw new Error(`Error! status:`);
       }
     
    
    const result=await response.json();
    return result; 
 }
 catch (err) {
     console.log(err);
   }
   
 }

export const  GetListOfProduct = async () => {
 
   let result = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}product`,
     {
       headers: {
         Authorization: `bearer ${JSON.parse(
           localStorage.getItem("admintoken")
         )}`,
       },
 
     }
   )
   
   result = await result.json();
   return result.productdata;
  
 };

 export const DeleteProductService = (_id) => {
 
  fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}product/${_id}`,
   { 
  method: "DELETE" ,
  headers: {
    Accept: "application/json",
    Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
  },
}).then(
    (result) => {
      result.json().then((response) => {
        console.warn("Deleted!!" + response);
        
      });
    }
  );
};
export const UpdateProductService = (item ) => {
  const formData = new FormData();
  formData.append("name", item.name);
  formData.append("price", item.price);
  formData.append("brand_name", item.brand_name);
  formData.append("product_quantity", item.product_quantity);
  formData.append("CategoryId", item.CategoryId);
  formData.append("ProductImage",item.ProductImage);
  
  fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}product/${item._id}`, {
    method: "PUT",
    body:formData,
    headers: {
     
      Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
    },
   
  }).then((result) => {
    result.json().then((resp) => {
      console.warn(resp);
    
      
    });
  });


}
