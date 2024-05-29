import React, { useEffect, useState } from "react";
import metroHost from "../../Services/metroHost";
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Layout, Button, Divider, Card, Text } from "@ui-kitten/components";
import { fetchOrder } from "../../Services/Order";
import { updateOrder } from "../../Services/Order";
import { REACT_APP_HEROKU } from "@env";
const Order_History = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    fetchOrder().then((item) => {
      setOrder(item);
    });
  }, []);
  return (
    <>
      <ScrollView>
        {order.map((item) => (
          <View style={{ paddingVertical: 4, paddingHorizontal: 20 }}>
            <Card>
              <Text category="h6">Order Status: {item.OrderStatus}</Text>
              <Text category="h6">Order Total: ${item.OrderTotal}</Text>
              <Button
                style={{ padding: 10 }}
                onPress={() => {
                  updateOrder(item._id),
                    ToastAndroid.show("Order Cancelled", ToastAndroid.SHORT);
                }}
              >
                Cancel Order
              </Button>
            </Card>
            {item.ProductId.map((detail, key) => (
              <Card>
                <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
                  <ImageBackground
                    style={{ width: 140, height: 140 }}
                    // source={{
                    //   uri: `${REACT_APP_HEROKU}/${detail.ProductImage}`,
                    // }}
                    source={{
                      uri: `http://192.168.43.188:5000/${detail.ProductImage}`,
                    }}
                  />
                  <View style={styles.detailsContainer}>
                    <Text
                      category="s1"
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      {detail.productname}
                    </Text>
                    <Text
                      category="s1"
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                      }}
                    >
                      ${detail.productprice}
                    </Text>
                  </View>
                </ScrollView>
              </Card>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default Order_History;
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
