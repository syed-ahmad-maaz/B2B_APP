// import axios from 'axios';

// export const blockDistributor = async (distributorId) => {
//   try {
//     const response = await axios.put(`http://localhost:5000/distributor/api/distributors/${distributorId}/block`); // Replace with your backend API endpoint to block the distributor
//     const { message } = response.data; // Assuming the API response contains a success message
//     return message;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to block distributor');
//   }
// };

export const CreateDistributor = async (
  FirstName,
  LastName,
  Email,
  password,
  RegionId,
  UserId
) => {
  try {
    console.log(UserId);

    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/signup`,
      {
        method: "post",
        body: JSON.stringify({
          FirstName,
          LastName,
          Email,
          password,
          UserId,
          RegionId,
        }),
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
    return result;
  } catch (err) {
    console.log(err);
  }
};

const LoginforDistributor = async (Email, Password) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/login`,
      {
        method: "post",
        body: JSON.stringify({ Email, Password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) {
      throw new Error("Distributor not found");
    }

    if (response.status === 401) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const result = await response.json();

    localStorage.setItem("DistributorToken", JSON.stringify(result.token));
    window.localStorage.setItem("DistributorLoggedIn", true);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};





export default LoginforDistributor;

export const GetDistributorList = async () => {
  let result = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/GetAllList`,
    {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },
    }
  );

  result = await result.json();
  console.log(result);
  return result.Distributordata;
};

export const GetAllDispatcherList = async () => {
  let result = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/listdispatch`,
    {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("DistributorToken")
        )}`,
      },
    }
  );

  result = await result.json();
  console.log(result);
  return result.dispatcherdata;
};

export async function UpdateDispatchServiceByDistributor(item) {
  let result = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/${item._id}`,
    {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("DistributorToken")
        )}`,
      },
    }
  );
  result = await result.json();
  return result;
}

export const ListofAllRetailersforDistributor = async () => {
  let result = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/listofretailers`,
    {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("DistributorToken")
        )}`,
      },
    }
  );

  result = await result.json();
  console.log(result);
  return result.retailerdata;
};

export async function BlockDistributorbyAdmin(item) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/api/distributors/${item._id}/block`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to block distributor");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function UnBlockDistributorbyAdmin(item) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}distributor/api/distributors/${item._id}/unblock`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to unblock distributor");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

