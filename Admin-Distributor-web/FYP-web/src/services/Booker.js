export const CreateBooker= async (FirstName,LastName,Email,password,Phone_no,RegionId)=>

 {
    
     try {
      
     
     
     const response= await fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}booker/signup`,{
      
         method:'post',
         body:JSON.stringify({FirstName,LastName,Email,password,Phone_no,RegionId}),
         headers:{
             'Content-Type':'application/json',
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
 export const GetAllBookerList = async () => {
 
    let result = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}booker/GetAllList`,
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
    return result.Bookerdata;
  };