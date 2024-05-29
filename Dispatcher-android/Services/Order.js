import { REACT_APP_LOCALHOST } from "@env";
import { REACT_APP_HEROKU } from "@env";

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

export async function updateOrder(id, remain) {
  const token = await AsyncStorage.getItem("token");
  try {
    let result = await fetch(
      `http://192.168.43.188:5000/orders/dispatch/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          OrderStatus: "Completed",
          AmountRemaining: remain,
        }),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "Application/json",
        },
      }
    );
    result = await result.json();
    return result.Orderdata;
  } catch (e) {
    console.log(e);
  }
}

export async function FetchdispatchOrder() {
  const token = await AsyncStorage.getItem("token");
  try {
    let url = `http://192.168.43.188:5000/orders/dispatch`;
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

export async function FetchHistoricDelivery() {
  const token = await AsyncStorage.getItem("token");
  try {
    let url = `http://192.168.43.188:5000/orders/dispatch/history`;
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
