export const  GetListOfRetailers = async () => {
 
    let result = await fetch(
     `${process.env.REACT_APP_LOCAL_HOST_PATH}retailer/list`,
      {
        headers: {
          Authorization: `bearer ${JSON.parse(
            localStorage.getItem("admintoken")
          )}`,
        },
  
      }
    )
    
    result = await result.json();
    return result.retailerdata;
   
  };


  export const  GetDistributorRetailers = async () => {
 
    let result = await fetch(
     `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/retailer`,
      {
        headers: {
          Authorization: `bearer ${JSON.parse(
            localStorage.getItem("DistributorToken")
          )}`,
        },
  
      }
    )
    
    result = await result.json();
    return result.userdata;
   
  };