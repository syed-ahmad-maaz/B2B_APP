
export const GetListOfOrder = async () => {
  
  let result = await fetch(
   `${process.env.REACT_APP_LOCAL_HOST_PATH}order`
    
   , {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },

    }
  )
  
  result = await result.json();
  console.log(result);
  return result.Orderdata;
};
export const GetOrderByDatee = async () => {
  
  let result = await fetch(
   `${process.env.REACT_APP_LOCAL_HOST_PATH}order/getorderbydate`
    
   , {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },

    }
  )
  
  result = await result.json();
  console.log(result);
  return result.orderData;
};

export const GetOrderByCategoryy = async () => {
  
  let result = await fetch(
   `${process.env.REACT_APP_LOCAL_HOST_PATH}order/getorderbycategory`
    
   , {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },

    }
  )
  result = await result.json();
  console.log(result);
  return result.orderData;
};

export const GetOrderByRegionn= async () => {
  
  let result = await fetch(
   `${process.env.REACT_APP_LOCAL_HOST_PATH}order/getorderbyregion`
    
   , {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },

    }
  )
  
  result = await result.json();
  console.log(result);
  return result.orderData;
};

export const GetOrderByRetailerr = async () => {
  
  let result = await fetch(
   `${process.env.REACT_APP_LOCAL_HOST_PATH}order/getorderbyretailer`
    
   , {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },

    }
  )
  
  result = await result.json();
  console.log(result);
  return result.orderData;
};



export const AcceptedStatusThroughDropDown = (item) => {
  
  fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}order/${item._id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },
      body: JSON.stringify({ OrderStatus: item.OrderStatus}),
    }
  ).then((result) => {
    result.json().then((resp) => {
      console.warn(resp);
    
    
    });
  });
};
export const RejectedStatusofOrder = (_id) => {
   
  
  fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}order/${_id}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },
      body: JSON.stringify({ OrderStatus: "Reject" }),
    }
  ).then((result) => {
    result.json().then((resp) => {
      console.warn(resp);
     
    });
  });
};


export const SpecificRetailersOrders = async () => {
  
  let result = await fetch(
   `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/retailer/orders`
    
   , {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("DistributorToken")
        )}`,
      },

    }
  )
  
  result = await result.json();
  console.log(result);
  return result.orderData;
};

export async function AssignedDispatchService(item) {
  console.log("Inn serviceeeeeee");
  let result = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}order/assign/${item._id}`,
    {
      method: "PUT",
      body: JSON.stringify({ DispatcherId: item.DispatcherId }),
      headers: {
      
        "Content-Type": "application/json",
        // Authorization: `bearer ${JSON.parse(localStorage.getItem('DistributorToken'))}`
      },
    }
  );
  
    result = await result.json();
 


  };