// import swal from 'sweetalert';
export const GetListOfAdmin = async () => {
   
  let result = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}admin/loginInfo`,
    {
      // headers: {
      //   Authorization: `bearer ${JSON.parse(
      //     localStorage.getItem("admintoken")
      //   )}`,
      // },

    }
  )
  
  result = await result.json();
  console.log(result);
  return result.admindata;
};
const LoginforAdmin= async (email, password) => {
    try {
    
      const response = await fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}admin/login`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (!response.ok) {
        throw new Error(`Error! status:`);
      }
      const result = await response.json();
      localStorage.setItem("admintoken",JSON.stringify(result.token))
      window.localStorage.setItem("isLoggedIn", true);
      
      return result;
    } catch (err) {
      
      console.log(err);
    }
    
  };
  
  export default LoginforAdmin;
  