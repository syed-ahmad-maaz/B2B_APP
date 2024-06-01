export const AddOffers = async (
  description,
  OfferImage,
  Expiry_Date,
  BuyQuantity,
  GetQuantity,
  BuyItem,
  GetItem
) => {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("OfferImage", OfferImage, OfferImage.name);
  formData.append("Expiry_Date", Expiry_Date);
  formData.append("BuyQuantity", BuyQuantity);
  formData.append("GetQuantity", GetQuantity);
  formData.append("BuyItem", BuyItem);
  formData.append("GetItem", GetItem);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}upcomingoffers`,
      {
        method: "post",

        body: formData,
        headers: {
          Authorization: `bearer ${JSON.parse(
            localStorage.getItem("admintoken")
          )}`,
        },
      }
    );
    console.log("Successfully fetched api of offers category");

    if (!response.ok) {
      throw new Error(`Error! status:`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
export const GetListOfOffers = async () => {
  let result = await fetch(
    `${process.env.REACT_APP_LOCAL_HOST_PATH}upcomingoffers`,
    {
      method: "get",
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },
    }
  );

  result = await result.json();
  console.log(result);
  return result.offerCreate;
};

export const DeleteOfferService = (_id) => {
  fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}upcomingoffers/${_id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${JSON.parse(localStorage.getItem("admintoken"))}`,
    },
  }).then((result) => {
    result.json().then((response) => {
      console.warn(response);
    });
  });
};
export const UpdateOffersService = (item) => {
  const formData = new FormData();
  formData.append("description", item.description);
  formData.append("OfferImage", item.OfferImage);
  formData.append("BuyQuantity", item.BuyQuantity);
  formData.append("GetQuantity", item.GetQuantity);
  formData.append("Expiry_Date", item.Expiry_Date);

  fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}upcomingoffers/${item._id}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("admintoken"))}`,
    },
  }).then((result) => {
    result.json().then((resp) => {
      console.warn(resp);
    });
  });
};

export const ProductsList = async () => {
  try {
    var res = await fetch(`${process.env.REACT_APP_LOCAL_HOST_PATH}product`, {
      headers: {
        Authorization: `bearer ${JSON.parse(
          localStorage.getItem("admintoken")
        )}`,
      },
    });

    var resp = await res.json();
    return resp.productdata;
  } catch (e) {
    console.log("error", e);
  }
};
