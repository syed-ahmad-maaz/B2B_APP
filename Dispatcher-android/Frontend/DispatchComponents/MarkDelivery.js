import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, ToastAndroid } from "react-native";
import { Text, Input, Button } from "@ui-kitten/components";
import Styles from "../LoginComponents/RegFormStyle";
import { updateOrder } from "../../Services/Order";

const MarkDelivery = ({ route }) => {
  const { OrderStatus, OrderTotal, OrderId } = route.params.params;
  const [paid, setpaid] = useState(0);
  const [remain, setremain] = useState(0);

  useEffect(() => {
    const remaining = OrderTotal - paid;
    setremain(remaining >= 0 ? remaining : 0);
  }, [paid, OrderTotal]);

  return (
    <>
      <ScrollView>
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
            <View style={styles.detailsContainer}>
              <Text
                category="s1"
                style={{
                  fontSize: 18,
                  paddingVertical: 10,
                  // fontWeight: "bold",
                }}
              >
                Order Status: {OrderStatus}
              </Text>
              <Text
                category="s1"
                style={{
                  fontSize: 18,
                  paddingVertical: 10,
                  // fontWeight: "bold",
                }}
              >
                Order Total: ${OrderTotal}
              </Text>
              <Input
                style={Styles.formInput}
                placeholder="Amount Paid"
                onChangeText={(e) => {
                  setpaid(e);
                }}
              ></Input>
              <Text
                style={{
                  fontSize: 18,
                  paddingVertical: 10,
                  // fontWeight: "bold",
                }}
              >
                Remaining Amount: ${remain}
              </Text>
              <Button
                style={{ padding: 10 }}
                onPress={() => {
                  updateOrder(OrderId, remain),
                    ToastAndroid.show("Order Marked", ToastAndroid.SHORT);
                }}
              >
                Mark as Complete
              </Button>
            </View>
          </ScrollView>
        </View>
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

export default MarkDelivery;
