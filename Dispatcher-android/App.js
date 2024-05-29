import React from "react";
import { StatusBar } from "react-native";
import { REACT_APP_HEROKU } from "@env";
import Login from "./Frontend/LoginComponents/Login";
import ForgotPassword from "./Frontend/LoginComponents/ForgotPassword";
import ChangePassword from "./Frontend/LoginComponents/ChangePassword";
import { UserProvider } from "./Context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
const Stack = createNativeStackNavigator();
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import MyTabs from "./Frontend/DispatchComponents/DeliveryPlan";
import MarkDelivery from "./Frontend/DispatchComponents/MarkDelivery";
console.log(`${REACT_APP_HEROKU}`);

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="black" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {/* <Stack.Screen name="Registration" component={Reg_form} /> */}
              <Stack.Screen name="Dispatch Login" component={Login} />
              <Stack.Screen name=" " component={MyTabs} />

              <Stack.Screen name="Password" component={ChangePassword} />
              <Stack.Screen name="Forgot" component={ForgotPassword} />

              <Stack.Screen name="MarkDelivery" component={MarkDelivery} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </ApplicationProvider>
    </>
  );
}
