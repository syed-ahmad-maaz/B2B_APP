import React, { useEffect, useState } from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Button, Input, Text, Layout } from "@ui-kitten/components";
import { Picker } from "@react-native-picker/picker";
import Styles from "./RegFormStyle";
import { addRetailer } from "../../Services/Retailer";
import GetRegion from "../../Services/Region";
import Icon from "react-native-vector-icons/Ionicons";
import ForgotPassword from "./ForgotPassword";
import { verifyPhone } from "../../Services/Retailer";
import { sendRegistrationOtp } from "../../Services/Retailer";

const Reg_form = ({ navigation }) => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Phone_no, setPhone_no] = useState("");
  const [password, setPassword] = useState("");
  const [RegionId, setRegionId] = useState("");
  const [Email, setEmail] = useState("");

  const [FirstNameValidError, setFirstNameValidError] = useState("");
  const [LastNameValidError, setLastNameValidError] = useState("");
  const [EmailValidError, setEmailValidError] = useState("");
  const [PhoneValidError, setPhoneValidError] = useState("");
  const [PasswordValidError, setPasswordValidError] = useState("");
  const [region, setregion] = useState([]);

  useEffect(() => {
    GetRegion().then((items) => {
      setregion(items);
    });
  }, []);

  const submit = () => {
    FirstNamevalidate(FirstName);
    LastNamevalidate(LastName);
    emailvalidate(Email);
    phonevalidate(Phone_no);
    passwordvalidate(password);

    if (FirstName == "" || LastName == "" || Phone_no == "" || password == "") {
      ToastAndroid.show("Please Fill All Fields", ToastAndroid.SHORT);
    }
    if (
      FirstName != "" &&
      LastName != "" &&
      Phone_no != "" &&
      password != "" &&
      FirstNameValidError == "" &&
      LastNameValidError == "" &&
      PhoneValidError == "" &&
      PasswordValidError == ""
    ) {
      // verifyPhone(Phone_no).then((response) => {
      //   if (!response) {
      //     ToastAndroid.show("Phone Number already exists", ToastAndroid.SHORT);
      //   } else {
      //     sendRegistrationOtp(Email).then((response) => {
      //       if (response) {
      //         ToastAndroid.show("Email Sent !", ToastAndroid.SHORT);
      //         navigation.navigate("Verification", {
      //           FirstName: FirstName,
      //           LastName: LastName,
      //           Email: Email,
      //           Phone_no: Phone_no,
      //           password: password,
      //           RegionId: RegionId,
      //         });
      //       }
      //       // else {
      //       //   navigation.navigate(" ");
      //       // }
      //     });
      //   }
      // });
      addRetailer(
        FirstName,
        LastName,
        Email,
        Phone_no,
        password,
        RegionId
      ).then((result) => {
        if (result) {
          navigation.navigate(" ");
        }
      });
    }
  };
  const FirstNamevalidate = (FirstName) => {
    const re = /^[a-zA-Z]*$/;
    if (re.test(FirstName) === false) {
      setFirstNameValidError("Enter valid name (Only Characters, No spaces)");
    } else {
      setFirstNameValidError("");
    }
  };

  const LastNamevalidate = (LastName) => {
    const re = /^[a-zA-Z]*$/;
    if (re.test(LastName) === false) {
      setLastNameValidError("Enter valid name (Only Characters, No spaces)");
    } else {
      setLastNameValidError("");
    }
  };

  const emailvalidate = (Email) => {
    const reg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.\.[A-Z]{2,4}$/i;
    if (reg.test(Email) === false) {
      setEmailValidError("Enter valid email");
    } else {
      setEmailValidError("");
    }
  };

  const phonevalidate = (Phone_no) => {
    const regular = /^[0-9]*$/;
    if (regular.test(Phone_no) === false) {
      setPhoneValidError("Enter Valid Phone Number(Max Length 11)");
    }
    if (Phone_no.length < 11) {
      setPhoneValidError("Phone number should be 11 digits");
    } else {
      setPhoneValidError("");
    }
  };
  const passwordvalidate = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (regex.test(password) === false) {
      setPasswordValidError(
        "Minimum eight characters, at least one letter, one number and one special character"
      );
    } else {
      setPasswordValidError("");
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={{ height: "100%" }}>
        <Layout style={[Styles.container, Styles.formContainer]}>
          {/*  */}
          <Button
            style={Styles.signInButton}
            // appearance="ghost"
            status="control"
            size="giant"
            accessoryLeft={<Icon name="arrow-forward" size={15} />}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Sign In
          </Button>
          <Input
            placeholder="Ahmad"
            label="FIRST NAME"
            value={FirstName}
            onChangeText={(e) => {
              setFirstName(e);
              FirstNamevalidate(e);
            }}
          />
          {FirstNameValidError ? (
            <Text style={{ color: "red", alignSelf: "center" }}>
              {FirstNameValidError}
            </Text>
          ) : (
            <></>
          )}
          <Input
            style={Styles.formInput}
            placeholder="Maaz"
            label="LAST NAME"
            value={LastName}
            onChangeText={(e) => {
              setLastName(e);
              LastNamevalidate(e);
            }}
          ></Input>
          {LastNameValidError ? (
            <Text style={{ color: "red", alignSelf: "center" }}>
              {LastNameValidError}
            </Text>
          ) : (
            <></>
          )}
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
            <Text style={{ color: "red", alignSelf: "center" }}>
              {EmailValidError}
            </Text>
          ) : (
            <></>
          )}
          <Input
            style={Styles.formInput}
            placeholder="0333XXXXXXX"
            label="PHONE NUMBER"
            value={Phone_no}
            minValue={11}
            keyboardType="number-pad"
            maxLength={11}
            onChangeText={(e) => {
              setPhone_no(e);
              phonevalidate(e);
            }}
          ></Input>
          {PhoneValidError ? (
            <Text style={{ color: "red", alignSelf: "center" }}>
              {PhoneValidError}
            </Text>
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
              passwordvalidate(e);
            }}
          ></Input>
          {PasswordValidError ? (
            <Text style={{ color: "red", alignSelf: "center" }}>
              {PasswordValidError}
            </Text>
          ) : (
            <></>
          )}
          <Text style={{ top: 10 }} appearance="hint">
            Choose Your Region
          </Text>
          <Layout style={{ top: 15 }} level="2">
            <Picker
              mode="dropdown"
              placeholder="Select your country"
              placeholderStyle={{ color: "#007aff" }}
              style={{ height: 50, width: 300 }}
              selectedValue={RegionId}
              onValueChange={(index) => setRegionId(index)}
            >
              {region.map((items) => (
                <Picker.Item label={items.region} value={items._id} />
              ))}
            </Picker>
          </Layout>
          <View>
            <Button
              style={Styles.signUpButton}
              Layout={Styles.btn}
              onPress={() => {
                submit();
              }}
            >
              Register
            </Button>
            <View style={{ flexDirection: "row", left: 120 }}>
              <Text
                onPress={() => {
                  navigation.navigate(" ");
                }}
                style={{ color: "blue" }}
              >
                Continue Without Signup
              </Text>
              <Icon
                style={{ padding: 5, bottom: 1 }}
                name="arrow-redo"
                size={15}
              />
            </View>
          </View>
        </Layout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Reg_form;
