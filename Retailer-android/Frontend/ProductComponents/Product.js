import View_user from "../RegistrationComponents/ViewUser";
import Offer_form from "../OfferComponents/Offer";
import Order_History from "../OrderComponents/OrderHistory";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Layout, Text, Card } from "@ui-kitten/components";
import fetchProduct from "../../Services/Product";
import { REACT_APP_HEROKU } from "@env";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Style from "../CategoriesComponents/CategoriesStyle";
import { ImageBackground, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import metroHost from "../../Services/metroHost";

const Tab = createBottomTabNavigator();

function Product_Tabs({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Product_form"
      activeColor="black"
      barStyle={{ backgroundColor: "blue" }}
    >
      <Tab.Screen
        name="View Products"
        component={Product_form}
        options={{
          tabBarLabel: "Products",
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
      {/* <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarIcon: ({ tintColor }) => (
            <Icon name="log-out-outline" color={tintColor} size={15} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const Product_form = ({ navigation, route }) => {
  const [product, setProduct] = useState([]);
  const { category } = route.params;
  useEffect(() => {
    fetchProduct(category).then((item) => {
      setProduct(item);
    });
  }, []);

  return (
    <ScrollView>
      <ScrollView contentContainerStyle={Style.spacing}>
        {product.map((item, i) => (
          <Layout style={{ paddingBottom: 10 }}>
            <Card
              key={i}
              onPress={() => {
                navigation.navigate("  ", {
                  screen: "Details",
                  params: {
                    productId: item._id,
                    productname: item.name,
                    productprice: item.price,
                    productbrand: item.brand_name,
                    ProductImage: item.ProductImage,
                    product_quantity: item.product_quantity,
                  },
                });
              }}
              header={() => (
                <ImageBackground
                  // source={{ uri: `${REACT_APP_HEROKU}/${item.ProductImage}` }}
                  source={{
                    uri: `http://192.168.43.188:5000/${item.ProductImage}`,
                  }}
                  style={Style.itemHeader}
                />
              )}
              footer={() => (
                <Text
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                  }}
                  category="h6"
                >
                  ${item.price}
                </Text>
              )}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                {item.name}
              </Text>
            </Card>
          </Layout>
        ))}
      </ScrollView>
    </ScrollView>
  );
};
export default Product_Tabs;
