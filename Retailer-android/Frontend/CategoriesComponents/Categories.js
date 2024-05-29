import React, { useEffect, useState } from "react";
import { ScrollView, ImageBackground } from "react-native";
import { getCategory } from "../../Services/Category";
import View_user from "../RegistrationComponents/ViewUser";
import Offer_form from "../OfferComponents/Offer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import { Card, Text, Layout } from "@ui-kitten/components";
import { REACT_APP_HEROKU } from "@env";
import Order_History from "../OrderComponents/OrderHistory";
import Icon from "react-native-vector-icons/Ionicons";
import Style from "./CategoriesStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import metroHost from "../../Services/metroHost";
function MyTabs({ navigation }) {
  function Logout() {
    AsyncStorage.clear();
    navigation.replace("Login");
  }

  return (
    <Tab.Navigator
      initialRouteName="Category_form"
      activeColor="black"
      barStyle={{ backgroundColor: "blue" }}
    >
      <Tab.Screen
        name="View Categories"
        component={Category_form}
        options={{
          tabBarLabel: "Category",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="list-outline" color={tintColor} size={15} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={View_user}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="person-outline" color={tintColor} size={15} />
          ),
        }}
      />
      <Tab.Screen
        name="Offers"
        component={Offer_form}
        options={{
          tabBarLabel: "Offers",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="gift-outline" color={tintColor} size={15} />
          ),
        }}
      />
      <Tab.Screen
        name="Order_History"
        component={Order_History}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="reorder-four-outline" color={tintColor} size={15} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Icon name="log-out-outline" color={tintColor} size={15} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Category_form = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategory().then((items) => {
      setCategories(items);
    });
  }, []);

  return (
    <ScrollView>
      <ScrollView contentContainerStyle={Style.spacing}>
        {categories.map((items) => (
          <Layout style={{ paddingBottom: 10 }}>
            <Card
              // style={Style.card}
              onPress={() =>
                navigation.navigate("Products", {
                  screen: "View Products",
                  params: { category: items._id },
                })
              }
              header={() => (
                <ImageBackground
                  // source={{ uri: `${REACT_APP_HEROKU}/${items.CategoryImage}` }}
                  source={{
                    uri: `http://192.168.43.188:5000/${items.CategoryImage}`,
                  }}
                  style={Style.itemHeader}
                />
              )}
              footer={() => (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  {items.category_name}
                </Text>
              )}
            ></Card>
          </Layout>
        ))}
      </ScrollView>
    </ScrollView>
  );
};
export default MyTabs;
