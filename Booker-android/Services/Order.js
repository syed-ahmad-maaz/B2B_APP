import { REACT_APP_LOCALHOST } from "@env";
import { REACT_APP_HEROKU } from "@env";
import metroHost from "./metroHost";
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function addOrder(cart, total, OrderStatus, quan, OfferId) {
  const token = await AsyncStorage.getItem("token");
  try {
    let response = await fetch(`http://192.168.43.188:5000/orders`, {
      method: "post",
      body: JSON.stringify({
        OrderTotal: total,
        ProductId: cart,
        OrderStatus: OrderStatus,
        Order_Quantity: quan,
        OfferId: OfferId,
      }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result.Orderdata;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchOrder() {
  const token = await AsyncStorage.getItem("token");
  try {
    let url = `http://192.168.43.188:5000/orders`;
    var res = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    var resp = await res.json();
    return resp.orderData;
  } catch (e) {
    console.log(e);
  }
}

export async function updateOrder(id) {
  const token = await AsyncStorage.getItem("token");
  try {
    let result = await fetch(`http://192.168.43.188:5000/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ OrderStatus: "Cancelled" }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "Application/json",
      },
    });
    result = await result.json();
    return result.Orderdata;
  } catch (e) {
    console.log(e);
  }
}
export async function UpdateRegionService(item) {
  try {
    let result = await fetch(
      `${process.env.REACT_APP_LOCAL_HOST_PATH}region/${item._id}`,
      {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}`
        },
      }
    );
    result = await result.json();
    return result.regiondata;
  } catch (e) {
    console.log(e);
  }
}
const updateRegion = () => {
  const updatedRegionName = RegionName.current.value;
  const updatedCapitalName = capitalName.current.value;

  let item = { _id, region: updatedRegionName, capital: updatedCapitalName };

  UpdateRegionService(item).then((result) => {
    if (!result) {
      alert("Data Updated");
    } else {
      alert("Duplicate entry not allowedd");
    }
  });
};
