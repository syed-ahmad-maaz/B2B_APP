export const CreateDispatch= async (FirstName,LastName,Email,password,Phone_no,DistributorId)=>

 {
    
     try {
      
     
     
     const response= await fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}dispatch/signup`,{
      
         method:'post',
         body:JSON.stringify({FirstName,LastName,Email,password,Phone_no,DistributorId}),
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

 export const GetDispatcherList = async () => {
 
    let result = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}dispatch/alldispatchers`,
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
    return result.dispatcherdata;
  };

  export const DeleteDispatcher = (_id) => {
 
    fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}dispatch/${_id}`, 
    { method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
    },
   }).then(
      (result) => {
        result.json().then((response) => {
          console.log("Deleted!!");
         
        });
      }
    );
  };
  
  export async function UpdateDispatchService(item) {
  
    let result = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}dispatch/${item._id}`,
      {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}`
        },
      }
    );
    result = await result.json();
      return result;
   
  
  
    

  };

  export const  CreateDispatchbyDistributor= async (FirstName,LastName,Email,password,Phone_no,DistributorId)=>

 {
    
     try {
      
     
     
     const response= await fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/dispatch`,{
      
         method:'post',
         body:JSON.stringify({FirstName,LastName,Email,password,Phone_no,DistributorId}),
         headers:{
             'Content-Type':'application/json',
             Authorization: `bearer ${JSON.parse(localStorage.getItem('DistributorToken'))}`
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
