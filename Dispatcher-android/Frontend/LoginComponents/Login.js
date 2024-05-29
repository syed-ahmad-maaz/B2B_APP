import React, { useState } from "react";
import { ToastAndroid } from "react-native";
import { Button, Input, Text, Layout } from "@ui-kitten/components";
import Styles from "./RegFormStyle";
import { LoginDispatch } from "../../Services/Dispatch";
import Icon from "react-native-vector-icons/Ionicons";
const Login = ({ navigation }) => {
  const [Email, setEmail] = useState("");

  const [EmailValidError, setEmailValidError] = useState("");
  const [password, setPassword] = useState("");

  const emailvalidate = (Email) => {
    // const reg = /^w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const reg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.\.[A-Z]{2,4}$/i;
    // const reg =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (reg.test(Email) === false) {
      setEmailValidError("Enter valid email");
    } else {
      setEmailValidError("");
    }
  };

  const handleLogin = async () => {
    LoginDispatch(Email, password).then((result) => {
      if (result) {
        navigation.replace(" ");
      }
    });
  };

  return (
    <Layout style={[Styles.container, Styles.formContainer]}>
      {/* <Button
        style={Styles.signInButton}
        // appearance="ghost"
        status="control"
        size="giant"
        accessoryLeft={<Icon name="arrow-forward" size={15} />}
        onPress={() => {
          navigation.navigate("Registration");
        }}
      >
        Sign Up
      </Button> */}
      <Input
        style={Styles.formInput}
        placeholder="syed.ahmad@gmail.com"
        label="EMAIL"
        value={Email}
        onChangeText={(e) => {
          setEmail(e);
          emailvalidate(e);
        }}
      ></Input>
      {EmailValidError ? (
        <Text style={Styles.text}>{EmailValidError}</Text>
      ) : (
        <></>
      )}
      <Input
        style={Styles.formInput}
        placeholder="password"
        label="PASSWORD"
        secureTextEntry={true}
        value={password}
        onChangeText={(e) => {
          setPassword(e);
        }}
      ></Input>
      <Button
        style={Styles.signUpButton}
        onPress={() => {
          handleLogin();
        }}
      >
        Login
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("Forgot");
        }}
      >
        Forgot Password?
      </Button>
    </Layout>
  );
};

export default Login;
