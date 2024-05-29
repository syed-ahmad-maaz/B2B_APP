
const LoginBackend=  async (email, password)=>

 {
    
     try {
    
      console.log(`Data is in try statement in loginbackend function: email is ${email} and password is ${password}`);
     const responsee= await fetch("http://localhost:5000/Login",{
         method:'post',
         body:JSON.stringify({email,password}),
         headers:{
             'Content-Type':'application/json'
         }

     });
     if (!responsee.ok) {
      // ${response.status}
         throw new Error(`Error! status:`);
       }
       //json kay bator body text pass krny pr mil jaye ga
    
    const result= await responsee.json();
    return result; 
 }
 catch (err) {
    //  console.log(err);
   }
  
 }
 export default LoginBackend;