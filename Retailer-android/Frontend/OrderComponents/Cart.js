import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import metroHost from "../../Services/metroHost";
import { UserContext } from "../../Context";
import {
  Text,
  Layout,
  Button,
  Icon,
  Divider,
  Card,
  ListItem,
} from "@ui-kitten/components";
import { REACT_APP_HEROKU } from "@env";
const Cart = ({ navigation, route }) => {
  const {
    productId,
    productname,
    productprice,
    productbrand,
    quantity,
    ProductImage,
  } = route.params;
  const { carts } = React.useContext(UserContext);
  const [cart, setcart] = carts;
  const initialValue = 0;
  let total = 0;
  let quan = 0;
  const remove = (productId) => {
    const newlist = cart.filter((item) => item.productId != productId);
    setcart(newlist);
  };

  return (
    <>
      {/* <Text style={{ fontSize: 18 }} category="h6">
        Cart Screen
      </Text> */}
      {cart.map((element) => {
        return (
          <ListItem style={styles.container}>
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
              <Icon
                style={{
                  left: 190,
                  width: 22,
                  height: 22,
                }}
                fill="#8F9BB3"
                name="close-outline"
                onPress={() => remove(element.productId)}
              />
              <Text style={{ fontSize: 18 }} category="h6">
                {element.productname}
              </Text>
              <Text style={{ fontSize: 14 }} appearance="hint" category="p2">
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

      <Layout>
        <Card>
          <Text>
            Order Total:
            {
              (total = cart.reduce(
                (accumulator, current) =>
                  accumulator + current.productprice * current.quantity,
                initialValue
              ))
            }
          </Text>
          <Text>Order Quantity:{(quan = cart.length)}</Text>
          <Button
            onPress={() =>
              navigation.navigate("Checkout", {
                productId: productId,
                productname: productname,
                productprice: productprice,
                productbrand: productbrand,
                ProductImage: ProductImage,
                quantity: quantity,
              })
            }
          >
            CheckOut
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
});
export default Cart;
