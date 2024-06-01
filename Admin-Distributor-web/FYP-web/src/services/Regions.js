import swal from 'sweetalert';
export const AddRegion = async (region, capital) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}region`,
      {
        method: "post",
        body: JSON.stringify({ region, capital }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${JSON.parse(
            localStorage.getItem("admintoken")
          )}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error! status:`);
    }

    const result = await response.json();

    if (result.data === "Token Expired") {
      // alert("Token Expired")
      localStorage.clear();
      window.location.href = "/";
    } else {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const GetRegionList = async () => {
 
  let result = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}region`,
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
  return result.regiondata;
};

export const DeleteRegionService = (_id) => {
 
  fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}region/${_id}`, 
  { method: "DELETE",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
  },
 }).then(
    (result) => {
      result.json().then((response) => {
        console.warn("Deleted!!");
       
      });
    }
  );
};

export async function UpdateRegionService(item) {
  
    let result = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}region/${item._id}`,
      {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
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
    {
    swal({
      icon: 'error',
      title: 'Oops...Duplicate Region',
      text: 'Duplicate entry not alloweed!',
      
    })
  }
  
    

  };