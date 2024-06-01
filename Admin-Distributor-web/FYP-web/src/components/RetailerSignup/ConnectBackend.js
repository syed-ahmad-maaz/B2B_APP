import bcrypt from 'bcryptjs';
const ConnectBackend= async (First_name,Last_name,Phone_no,password)=>

 {
    
     try {
      const hash = bcrypt.genSaltSync(10);
      const hashedpassword = bcrypt.hashSync(password, hash);
    
      console.log(`Data going in backend as name: ${First_name} and  and password is ${Last_name}
      and pgone number is ${Phone_no} and password is ${password}`);
     const response= await fetch("http://localhost:5000/retailer",{
        // await
         method:'post',
         body:JSON.stringify({First_name,Last_name,Phone_no,
        password: hashedpassword}),
         headers:{
             'Content-Type':'application/json'
         }


     })
    
     if (!response.ok) {
      // ${response.status}
         throw new Error(`Error! status:`);
       }
       //json kay bator body text pass krny pr mil jaye ga
    
    const result=await response.json();
    return result; 
 }
 catch (err) {
    //  console.log(err);
   }
  //  console.log("data not recieved in backend");
 }
export default ConnectBackend;