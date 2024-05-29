import React, { useEffect, useState } from "react";
import {
  View,
  Alert,
  ScrollView,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import metroHost from "../../Services/metroHost";
import { UserContext } from "../../Context";
import { addOrder } from "../../Services/Order";
import { REACT_APP_HEROKU } from "@env";
import { Layout, Button, Text, Card, ListItem } from "@ui-kitten/components";
import { fetchOffer } from "../../Services/UpcomingOffer";
import Style from "../CategoriesComponents/CategoriesStyle";
const Checkout = () => {
  const { carts } = React.useContext(UserContext);
  const [cart, setcart] = carts;
  const [offer, setoffer] = useState([]);
  const OrderStatus = "Pending";
  let currentdate = Date();
  let date = new Date();
  let expirydate;
  let OfferId;
  const initialValue = 0;
  let total = 0;
  let quan = 0;

  useEffect(() => {
    fetchOffer().then((items) => {
      setoffer(items);
    });
  }, []);

  return (
    <>
      <ScrollView>
        <View>
          {cart.map((element) => {
            return (
              <ListItem style={Style.container}>
                <Image
                  style={{ width: 120, height: 144 }}
                  // source={{
                  //   uri: `${REACT_APP_HEROKU}/${element.ProductImage}`,
                  // }}
                  source={{
                    uri: `http://192.168.43.188:5000/${element.ProductImage}`,
                  }}
                />
                <View style={styles.detailsContainer}>
                  <Text style={{ fontSize: 18 }} category="h6">
                    {element.productname}
                  </Text>
                  <Text
                    style={{ fontSize: 14 }}
                    appearance="hint"
                    category="p2"
                  >
                    {element.productbrand}
                  </Text>
                  <Text style={{ fontSize: 18 }} category="h6">
                    ${element.productprice}
                  </Text>
                  <Text style={{ fontSize: 18 }} category="h6">
                    Quantity: {element.quantity}
                  </Text>
                </View>
              </ListItem>
            );
          })}
        </View>
      </ScrollView>

      <Layout>
        <Card>
          <Text style={{ alignSelf: "center" }}>
            Order Total: $
            {
              (total = cart.reduce(
                (accumulator, current) =>
                  accumulator + current.productprice * current.quantity,
                initialValue
              ))
            }
          </Text>
          <Text style={{ alignSelf: "center" }}>
            Order Quantity:{(quan = cart.length)}
          </Text>
          {offer.map((element) => {
            expirydate = new Date(element.Expiry_Date);
            if (
              cart.find(
                (item) =>
                  item.productname == element.BuyItem.name &&
                  item.quantity == element.BuyQuantity &&
                  expirydate.getTime() >= date.getTime()
              )
            ) {
              OfferId = element._id;
              return (
                <Layout>
                  <Text category="h6">Profit: </Text>
                  <Text style={{ alignSelf: "center" }}>
                    {"Product Name: "}
                    {element.BuyItem.name}
                  </Text>
                  <Text style={{ alignSelf: "center" }}>
                    {"Product Quantity: "}
                    {element.BuyQuantity}
                  </Text>
                </Layout>
              );
            }
          })}

          <Button
            onPress={() => {
              addOrder(cart, total, OrderStatus, quan, OfferId),
                ToastAndroid.show("Order Posted", ToastAndroid.SHORT);
            }}
          >
            Place Your Order
          </Button>
        </Card>
      </Layout>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0,
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
export default Checkout;
