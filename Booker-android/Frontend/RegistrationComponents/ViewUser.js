import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Card } from "@ui-kitten/components";
import { fetchuser } from "../../Services/Retailer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const View_user = ({ navigation }) => {
  const [user, setuser] = useState([]);
  useEffect(() => {
    fetchuser().then((item) => {
      setuser(item);
    });
  }, []);
  return (
    <ScrollView>
      {user.map((item) => (
        <View style={{ paddingVertical: 4, paddingHorizontal: 20 }}>
          <Card>
            <Text category="h6">
              First Name:<Text> {item.FirstName}</Text>{" "}
            </Text>
            <Text category="h6">
              Last Name:<Text> {item.LastName}</Text>{" "}
            </Text>
            <Text category="h6">
              Email:<Text> {item.Email}</Text>{" "}
            </Text>
            <Text category="h6">
              Phone_no:<Text> {item.Phone_no}</Text>{" "}
            </Text>
            <Text category="h6">
              Region Name:<Text> {item.RegionId.region}</Text>{" "}
            </Text>
            <Text category="h6">
              Region Capital:<Text> {item.RegionId.capital}</Text>{" "}
            </Text>
          </Card>
        </View>
      ))}
    </ScrollView>
  );
};

export default View_user;
