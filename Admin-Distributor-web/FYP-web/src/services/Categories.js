import swal from 'sweetalert';
export const AddCategories = async (category_name,CategoryImage) => {
    const formData = new FormData();
    formData.append("category_name", category_name);
    formData.append("CategoryImage", CategoryImage);
    // CategoryImage.name 
    
  
    try {
    
      const response= await fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}category`,{
        
           method:'post',
           body:formData,
           headers:{
             
               Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
               
           }
  
       })
       const result=await response.json();
       
   
       if (!response.ok) {
      
           throw new Error(`Error! status:`);
         }
         if(result.code===403)
         {
          localStorage.setItem('admintoken',null)
         }
       
      
     
      return result; 
   }
   catch (err) {
       console.log(err);
      
     }
  };
  
  export const GetListOfCategory = async () => {
   
    let result = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}category`,
      {
        headers: {
          Authorization: `bearer ${JSON.parse(
            localStorage.getItem("admintoken")
          )}`,
        },
  
      }
    )
    
    result = await result.json();
    console.log(result);
    return result.categorydata;
  };

 export const DeleteCategoryService = (_id) => {
   
    fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}category/${_id}`,
     { 
    method: "DELETE" ,
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
    },
  }).then(
      (result) => {
        result.json().then((response) => {
          console.warn(response);
        
        });
      }
    );
  };
  
  export async function UpdateCategoriesService(item) {
    const formData = new FormData();
    formData.append("category_name",item.category_name);
     formData.append("CategoryImage", item.CategoryImage);
  
    let result = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}category/${item._id}`,
      {
        method: "PUT",
        body:formData,
        headers: {
         
          Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}`
        },
      }
    );
    if(result.status===200)
    {
      
      result = await result.json();
      return result;
    }
    if(result.status===400)
    swal({
      icon: 'error',
      title: 'Oops...Duplicate Category Name',
      text: 'Duplicate entry not alloweed!',
      
    })
  
    

  };
  
 