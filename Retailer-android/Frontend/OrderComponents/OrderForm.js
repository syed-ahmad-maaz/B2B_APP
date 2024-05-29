import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Cart from "./Cart";
import Icon from "react-native-vector-icons/Ionicons";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconButton, FAB } from "react-native-paper";
import Styles from "./cartStyle";
const Tab = createBottomTabNavigator();
import { Layout, Button, Text, Card } from "@ui-kitten/components";
import { UserContext } from "../../Context";
import { REACT_APP_HEROKU } from "@env";
import metroHost from "../../Services/metroHost";
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";
import Order_History from "./OrderHistory";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Tabs({ navigation, route }) {
  function Logout() {
    AsyncStorage.clear();
    navigation.navigate("Login");
  }

  return (
    <Tab.Navigator
      initialRouteName="Order_form"
      activeColor="black"
      barStyle={{ backgroundColor: "blue" }}
    >
      <Tab.Screen
        name="Details"
        component={Order_form}
        options={{
          tabBarLabel: "Details",
          tabBarIcon: ({ tintColor }) => (
            <MaterialIcon name="details" color={tintColor} size={15} />
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

const Order_form = ({ navigation, route }) => {
  const {
    productId,
    productname,
    productprice,
    productbrand,
    ProductImage,
    product_quantity,
  } = route.params;
  const { carts } = React.useContext(UserContext);
  const [cart, setcart] = carts;
  const [quantity, setquantity] = useState(Number);
  const [error, setError] = useState("");
  const addtocart = () => {
    setcart((current) => [
      ...current,
      {
        productId,
        productprice,
        productname,
        productbrand,
        ProductImage,
        quantity: parseInt(quantity, 10),
      },
    ]);
  };
  const validate = (quantity) => {
    if (product_quantity < quantity) {
      setError("Cannot Order more than Total Quantity");
    } else if (quantity == 0) {
      setError("Cannot Order 0 items");
    } else {
      setError("");
    }
  };
  const increment = () => {
    setquantity(quantity);
    if (product_quantity <= quantity) {
      setError("Cannot Order more than Total Quantity");
    } else {
      setquantity(quantity + 1);
      console.log("hi");
      setError("");
    }
  };
  const decrement = () => {
    setquantity(quantity - 1);
    console.log("hi");
    setError("");
  };

  const submit = () => {
    addtocart();
  };

  return (
    <ScrollView>
      <Layout style={Styles.header}>
        <Card
          header={() => (
            <ImageBackground
              // source={{ uri: `${REACT_APP_HEROKU}/${ProductImage}` }}
              source={{ uri: `http://192.168.43.188:5000/${ProductImage}` }}
              style={Styles.image}
            />
          )}
          footer={() => (
            <Layout style={Styles.detailsContainer} level="1">
              <Text category="h6">{productname}</Text>
              <Text style={Styles.subtitle} appearance="hint" category="p2">
                {productbrand}
              </Text>
              <Text style={Styles.price} category="h4">
                ${productprice}
              </Text>
              <Text>Enter Quantity</Text>
              <View style={{ flexDirection: "row" }}>
                <FAB
                  style={{ left: 10, backgroundColor: "lightblue" }}
                  small
                  icon="minus"
                  onPress={decrement}
                />
                <Text style={{ padding: 10, paddingHorizontal: 60 }}>
                  {quantity}
                </Text>
                <FAB
                  style={{ left: 10, backgroundColor: "lightblue" }}
                  small
                  icon="plus"
                  onPress={increment}
                />
              </View>
              {error ? <Text>{error}</Text> : <></>}
              <Text category="h6">Available Quantity: {product_quantity}</Text>
              <Layout style={{ flexDirection: "row" }}>
                <Button size="medium" onPress={() => submit()}>
                  ADD TO CART
                </Button>
                <IconButton
                  style={{ left: 126 }}
                  icon="cart-outline"
                  size={30}
                  onPress={() => {
                    navigation.navigate("Cart Items", {
                      productId: productId,
                      productname: productname,
                      productprice: productprice,
                      productbrand: productbrand,
                      ProductImage: ProductImage,
                      quantity: quantity,
                    });
                  }}
                />
              </Layout>
            </Layout>
          )}
        ></Card>
      </Layout>
    </ScrollView>
  );
};
export default Tabs;
