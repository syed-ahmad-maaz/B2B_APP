// import bcrypt from 'bcryptjs';
// name password is going and password is not encrypted 
const AdminBackend = async (name, password) => {
    
  try {
    // const hash = bcrypt.genSaltSync(10);
    // const hashedpassword = bcrypt.hashSync(password, hash);
   // console.log(`Data going in backend as ${region}`);
  const response= await fetch("http://localhost:5000/Admin",{
     // await
      method:'post',
      body:JSON.stringify({name, password}),
      headers:{
          'Content-Type':'application/json'
      }

  })
  console.log("Successgully fetched at frontend");
  if (!response.ok) {
   // ${response.status}
      throw new Error(`Error! status:`);
    }
    //json kay bator body text pass krny pr mil jaye ga
 
 const result=await response.json();
 return result; 
}
catch (err) {
  // console.log(err);
}
}
  
  
export default AdminBackend;
