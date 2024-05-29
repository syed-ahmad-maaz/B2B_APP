const ConnectRegionapi= async (region,capital,refid)=>

 {
    
     try {
    
      // console.log(`Data going in backend as ${region}`);
     const response= await fetch("http://localhost:5000/region",{
        // await
         method:'post',
         body:JSON.stringify({region,capital,refid}),
         headers:{
             'Content-Type':'application/json'
         }

     })
     console.log("Successfully fetched api of admin region");
     if (!response.ok) {
      // ${response.status}
         throw new Error(`Error! status:`);
       }
       //json kay bator body text pass krny pr mil jaye ga
    
    const result=await response.json();
    return result; 
 }
 catch (err) {
     console.log(err);
   }
   
 }
export default ConnectRegionapi;