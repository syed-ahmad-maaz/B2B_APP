import React, { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar, LogBox } from "react-native";
import { REACT_APP_HEROKU } from "@env";
import MyTabs from "./Frontend/RegistrationComponents/RegisterRetailer";
import Login from "./Frontend/LoginComponents/Login";
import View_user from "./Frontend/RegistrationComponents/ViewUser";
import ForgotPassword from "./Frontend/LoginComponents/ForgotPassword";
import ChangePassword from "./Frontend/LoginComponents/ChangePassword";
import { UserProvider } from "./Context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerifyOTP from "./Frontend/RegistrationComponents/VerifyOTP";
import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
const Stack = createNativeStackNavigator();
import { EvaIconsPack } from "@ui-kitten/eva-icons";

console.log(`${REACT_APP_HEROKU}`);
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <>
      <StatusBar backgroundColor="black" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Booker Login" component={Login} />
              <Stack.Screen name=" " component={MyTabs} />
              <Stack.Screen name="View Retailer" component={View_user} />
              <Stack.Screen name="Password" component={ChangePassword} />
              <Stack.Screen name="Forgot" component={ForgotPassword} />
              <Stack.Screen name="Verification" component={VerifyOTP} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </ApplicationProvider>
    </>
  );
}
