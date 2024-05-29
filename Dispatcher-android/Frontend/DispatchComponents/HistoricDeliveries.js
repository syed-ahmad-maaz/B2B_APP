import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Card } from "@ui-kitten/components";
import { FetchHistoricDelivery } from "../../Services/Order";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoricDeliveries = ({ navigation }) => {
  const [order, setorder] = useState([]);

  useEffect(() => {
    FetchHistoricDelivery().then((item) => {
      setorder(item);
    });
  }, [navigation]);
  return (
    <>
      <ScrollView>
        {order.map((item) => (
          <Card>
            <View style={{ paddingVertical: 4, paddingHorizontal: 20 }}>
              <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
                <View style={styles.detailsContainer}>
                  <Text
                    category="s1"
                    style={{
                      fontSize: 22,
                      // fontWeight: "bold",
                    }}
                  >
                    Name: {item.UserId.FirstName} {item.UserId.LastName}
                  </Text>
                </View>
              </ScrollView>
            </View>
            <View style={{ paddingVertical: 4, paddingHorizontal: 20 }}>
              <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
                <View style={styles.detailsContainer}>
                  <Text category="s1">Order Status: {item.OrderStatus}</Text>
                  <Text category="s1">Order Total: ${item.OrderTotal}</Text>
                  <Text category="s1">
                    Remaining Balance: ${item.AmountRemaining}
                  </Text>
                </View>
              </ScrollView>
            </View>

            {item.ProductId.map((detail, key) => (
              <View style={{ paddingVertical: 4, paddingHorizontal: 20 }}>
                <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
                  <View style={styles.detailsContainer}>
                    <Text category="s1">
                      Product Name: {detail.productname}
                    </Text>
                    <Text category="s1">
                      Product Price: ${detail.productprice}
                    </Text>
                  </View>
                </ScrollView>
              </View>
            ))}
          </Card>
        ))}
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

export default HistoricDeliveries;
