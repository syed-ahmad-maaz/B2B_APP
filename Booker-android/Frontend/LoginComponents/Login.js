import React, { useState } from "react";
import { Button, Input, Text, Layout } from "@ui-kitten/components";
import Styles from "../RegistrationComponents/RegFormStyle";
import { loginBooker } from "../../Services/Booker";
const Login = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [EmailValidError, setEmailValidError] = useState("");
  const [password, setPassword] = useState("");

  const emailvalidate = (Email) => {
    // const reg = /^w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    const reg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.\.[A-Z]{2,4}$/i;
    if (reg.test(Email) === false) {
      setEmailValidError("Enter valid email");
    } else {
      setEmailValidError("");
    }
  };

  const handleLogin = async () => {
    loginBooker(Email, password).then((result) => {
      if (result) {
        navigation.replace(" ");
      }
    });
  };

  return (
    <Layout style={[Styles.container, Styles.formContainer]}>
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

      {/* <Text
        style={{
          color: "blue",
          left: 194,
          textDecorationLine: "underline",
          fontWeight: "bold",
        }}
        onPress={() => {
          navigation.navigate("Forgot");
        }}
      >
        Forgot Password?
      </Text> */}
    </Layout>
  );
};

export default Login;
