import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import metroHost from "./metroHost";
export async function loginBooker(Email, password) {
  try {
    let response = await fetch(`http://192.168.43.188:5000/booker/Login`, {
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
      ToastAndroid.show("LOGGED IN", ToastAndroid.SHORT);
      const result = await response.json();
      await AsyncStorage.setItem("token", result.token);
      return result;
    }
  } catch (e) {
    console.log(e);
  }
}
export async function sendOtp(Email) {
  try {
    // let url = `${REACT_APP_HEROKU}/retailer`;
    const metroHost = Constants.manifest.debuggerHost.split(":").shift();

    console.log(metroHost);
    var res = await fetch(`http://192.168.43.188:5000/booker/sendEmail`, {
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
    var res = await fetch(`http://192.168.43.188:5000/booker/changePassword`, {
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
    });
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
