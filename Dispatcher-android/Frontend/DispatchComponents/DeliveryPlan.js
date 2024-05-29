import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Card } from "@ui-kitten/components";
import { FetchdispatchOrder } from "../../Services/Order";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoricDeliveries from "./HistoricDeliveries";

function MyTabs({ navigation }) {
  function Logout() {
    AsyncStorage.clear();
    navigation.replace("Dispatch Login");
  }

  return (
    <Tab.Navigator
      initialRouteName="Delivery_Plan"
      activeColor="black"
      barStyle={{ backgroundColor: "blue" }}
    >
      <Tab.Screen
        name="Delivery Plan"
        component={Delivery_Plan}
        options={{
          tabBarLabel: "Delivery Plan",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="list-outline" color={tintColor} size={15} />
          ),
        }}
      />
      <Tab.Screen
        name="Historic Deliveries"
        component={HistoricDeliveries}
        options={{
          tabBarLabel: "Historic Deliveries",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="list-outline" color={tintColor} size={15} />
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

const Delivery_Plan = ({ navigation }) => {
  const [order, setorder] = useState([]);

  useEffect(() => {
    console.log("hi");
    FetchdispatchOrder().then((item) => {
      setorder(item);
    });
  }, [order]);

  return (
    <>
      <ScrollView>
        {order.length > 0 ? (
          order.map((item) => (
            <Card
              key={item._id}
              onPress={() => {
                navigation.navigate("MarkDelivery", {
                  params: {
                    OrderId: item._id,
                    OrderStatus: item.OrderStatus,
                    OrderTotal: item.OrderTotal,
                  },
                });
              }}
            >
              <View style={{ paddingVertical: 4, paddingHorizontal: 20 }}>
                <View style={styles.detailsContainer}>
                  <Text category="s1">Order Status: {item.OrderStatus}</Text>
                  <Text category="s1">Order Total: ${item.OrderTotal}</Text>
                </View>
                {item.ProductId.map((detail, key) => (
                  <ScrollView
                    key={key}
                    contentContainerStyle={{ flexDirection: "row" }}
                  >
                    <View style={styles.detailsContainer}>
                      <Text category="s1">
                        Product Name: {detail.productname}
                      </Text>
                      <Text category="s1">
                        Product Price: ${detail.productprice}
                      </Text>
                    </View>
                  </ScrollView>
                ))}
              </View>
            </Card>
          ))
        ) : (
          <View style={{ flex: 1, alignItems: "center", paddingVertical: 20 }}>
            <Text category="s1">No Deliveries For Today</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 3,
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 144,
  },
  detailsContainer: {
    flex: 1,
    height: "100%",
    padding: 16,
  },
  amountContainer: {
    position: "absolute",
    flexDirection: "row",
    left: 16,
    bottom: 16,
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: "center",
    width: 40,
  },
  removeButton: {
    position: "absolute",
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});

export default MyTabs;
