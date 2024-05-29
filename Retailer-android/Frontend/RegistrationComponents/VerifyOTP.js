import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Button, Input, Text, Layout } from "@ui-kitten/components";
import { addRetailer } from "../../Services/Retailer";
import Styles from "./RegFormStyle";
const VerifyOTP = ({ navigation, route }) => {
  const [Code, setCode] = useState("");
  const { FirstName, LastName, Email, Phone_no, password, RegionId } =
    route.params;
  const submit = () => {
    addRetailer(
      FirstName,
      LastName,
      Email,
      Phone_no,
      password,
      RegionId,
      Code
    ).then((result) => {
      if (!result) {
        ToastAndroid.show("Invalid OTP", ToastAndroid.SHORT);
      } else {
        navigation.navigate(" ");
      }
    });
  };

  return (
    <Layout style={[Styles.container, Styles.formContainer]}>
      <Input
        style={Styles.formInput}
        label="OTP CODE"
        value={Code}
        onChangeText={(e) => {
          setCode(e);
        }}
      ></Input>
      <Button
        style={Styles.signUpButton}
        Layout={Styles.btn}
        onPress={() => {
          submit();
        }}
      >
        Send OTP
      </Button>
    </Layout>
  );
};
export default VerifyOTP;
