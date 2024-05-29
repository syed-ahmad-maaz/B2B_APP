import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar, LogBox } from "react-native";
import { REACT_APP_HEROKU } from "@env";
import Reg_form from "./Frontend/RegistrationComponents/RegForm";
import Login from "./Frontend/LoginComponents/Login";
import Product_Tabs from "./Frontend/ProductComponents/Product";
import View_user from "./Frontend/RegistrationComponents/ViewUser";
import MyTabs from "./Frontend/CategoriesComponents/Categories";
import Tabs from "./Frontend/OrderComponents/OrderForm";
import Order_form from "./Frontend/OrderComponents/OrderForm";
import Order_History from "./Frontend/OrderComponents/OrderHistory";
import Offer_form from "./Frontend/OfferComponents/Offer";
import Cart from "./Frontend/OrderComponents/Cart";
import Checkout from "./Frontend/OrderComponents/Checkout";
import ForgotPassword from "./Frontend/RegistrationComponents/ForgotPassword";
import ChangePassword from "./Frontend/RegistrationComponents/ChangePassword";
import { UserProvider } from "./Context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VerifyOTP from "./Frontend/RegistrationComponents/VerifyOTP";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
const Stack = createNativeStackNavigator();
import { EvaIconsPack } from "@ui-kitten/eva-icons";

console.log(`${REACT_APP_HEROKU}`);
LogBox.ignoreAllLogs();
export default function App() {
  const [login, setlogin] = useState("");
  useEffect(() => {
    const token = AsyncStorage.getItem("token");
    setlogin(token);
  }, []);

  return (
    <>
      <StatusBar backgroundColor="black" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {/* <Stack.Screen name="Registration" component={Reg_form} /> */}
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Password" component={ChangePassword} />
              <Stack.Screen name="Forgot" component={ForgotPassword} />
              <Stack.Screen name="Verification" component={VerifyOTP} />
              <Stack.Screen name=" " component={MyTabs} />
              <Stack.Screen name="Products" component={Product_Tabs} />
              <Stack.Screen name="View User" component={View_user} />
              <Stack.Screen name="  " component={Tabs} />
              <Stack.Screen name="Order History" component={Order_History} />
              <Stack.Screen name="Offers" component={Offer_form} />
              <Stack.Screen name="Cart Items" component={Cart} />
              <Stack.Screen name="Checkout" component={Checkout} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </ApplicationProvider>
    </>
  );
}
