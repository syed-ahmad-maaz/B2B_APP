import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_LOCALHOST } from "@env";
import { REACT_APP_HEROKU } from "@env";
import { ToastAndroid } from "react-native";

export async function LoginDispatch(Email, password) {
  try {
    let response = await fetch(`http://192.168.43.188:5000/dispatch/Login`, {
      // let response = await fetch(`${REACT_APP_HEROKU}/retailer/Login`, {
      method: "post",
      body: JSON.stringify({
        Email: Email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 400) {
      ToastAndroid.show("CREDENTIALS NOT FOUND", ToastAndroid.SHORT);
    } else {
      const result = await response.json();
      await AsyncStorage.setItem("token", result.token);
      ToastAndroid.show("LOGGED IN", ToastAndroid.SHORT);
      return result;
    }
  } catch (e) {
    console.log(e);
  }
}
export async function sendOtp(Email) {
  try {
    // let url = `${REACT_APP_HEROKU}/retailer`;
    console.log(Email);
    var res = await fetch(`http://192.168.43.188:5000/dispatch/sendEmail`, {
      // let response = await fetch(`${REACT_APP_HEROKU}/retailer`, {
      method: "post",
      body: JSON.stringify({
        Email: Email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 400) {
      ToastAndroid.show("EMAIL NOT FOUND", ToastAndroid.SHORT);
    } else {
      var response = await res.json();
      return response;
    }
  } catch (e) {
    console.log(e);
  }
}
export async function changePassword(Email, Code, Password) {
  try {
    // let url = `${REACT_APP_HEROKU}/retailer`;
    var res = await fetch(
      `http://192.168.43.188:5000/dispatch/changePassword`,
      {
        // let response = await fetch(`${REACT_APP_HEROKU}/retailer`, {
        method: "post",
        body: JSON.stringify({
          Email: Email,
          Code: Code,
          Password: Password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 400) {
      ToastAndroid.show("INVALID OTP", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("PASSWORD UPDATED", ToastAndroid.SHORT);
      var response = await res.json();
      return response;
    }
  } catch (e) {
    console.log(e);
  }
}
