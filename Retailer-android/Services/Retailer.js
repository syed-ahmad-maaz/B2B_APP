import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_LOCALHOST } from "@env";
import { REACT_APP_HEROKU } from "@env";
import { Alert } from "react-native";
import metroHost from "./metroHost";

export async function loginRetailer(Email, password) {
  try {
    let response = await fetch(`http://192.168.43.188:5000/retailer/Login`, {
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
    const result = await response.json();
    await AsyncStorage.setItem("token", result.token);
    return result;
  } catch (e) {
    console.log(e);
  }
}
export async function addRetailer(
  FirstName,
  LastName,
  Email,
  Phone_no,
  password,
  RegionId,
  Code
) {
  try {
    let response = await fetch(`http://192.168.43.188:5000/retailer`, {
      // let response = await fetch(`${REACT_APP_HEROKU}/retailer`, {
      method: "post",
      body: JSON.stringify({
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Phone_no: Phone_no,
        password: password,
        RegionId: RegionId,
        Code: Code,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 400) {
      Alert.alert("Phone Number already exists");
    }
    const result = await response.json();
    await AsyncStorage.setItem("token", result.token);
    return result;
  } catch (e) {
    console.log("hello");
  }
}
export async function fetchuser() {
  const token = await AsyncStorage.getItem("token");
  try {
    let url = `http://192.168.43.188:5000/retailer`;
    // let url = `${REACT_APP_HEROKU}/retailer`;
    var res = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    var resp = await res.json();
    return resp.userdata;
  } catch (e) {
    console.log(e);
  }
}
export async function sendOtp(Email) {
  try {
    // let url = `${REACT_APP_HEROKU}/retailer`;
    console.log(Email);
    var res = await fetch(`http://192.168.43.188:5000/retailer/sendEmail`, {
      // let response = await fetch(`${REACT_APP_HEROKU}/retailer`, {
      method: "post",
      body: JSON.stringify({
        Email: Email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
}
export async function sendRegistrationOtp(Email) {
  try {
    // let url = `${REACT_APP_HEROKU}/retailer`;
    console.log(Email);
    var res = await fetch(
      `http://192.168.43.188:5000/retailer/sendRegistrationEmail`,
      {
        // let response = await fetch(`${REACT_APP_HEROKU}/retailer`, {
        method: "post",
        body: JSON.stringify({
          Email: Email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    var response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
}
export async function changePassword(Email, Code, Password) {
  try {
    // let url = `${REACT_APP_HEROKU}/retailer`;
    var res = await fetch(
      `http://192.168.43.188:5000/retailer/changePassword`,
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
      Alert.alert("Invalid OTP");
    } else {
      Alert.alert("Password Updated");
    }
    var response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
}
export async function verifyPhone(Phone_no) {
  try {
    // let url = `${REACT_APP_HEROKU}/retailer`;
    var res = await fetch(`http://192.168.43.188:5000/retailer/verifyPhone`, {
      // let response = await fetch(`${REACT_APP_HEROKU}/retailer`, {
      method: "post",
      body: JSON.stringify({
        Phone_no: Phone_no,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
}
