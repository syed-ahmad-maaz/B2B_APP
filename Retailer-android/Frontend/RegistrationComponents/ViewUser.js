import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Layout, Divider } from "@ui-kitten/components";
import { fetchuser } from "../../Services/Retailer";
const _ = require("lodash");
const View_user = () => {
  const [user, setuser] = useState([]);
  useEffect(() => {
    fetchuser().then((item) => {
      setuser(item);
    });
  }, []);
  return (
    <ScrollView
      style={styles.contain}
      contentContainerStyle={styles.contentContainer}
    >
      <Divider style={{ padding: 10 }} />
      <Layout style={styles.container}>
        <Text appearance="hint">First Name</Text>
        <Text category="p1">{user.FirstName}</Text>
      </Layout>
      <Divider style={{ padding: 1 }} />
      <Layout style={styles.container}>
        <Text appearance="hint">Last Name </Text>
        <Text category="p1">{user.LastName}</Text>
      </Layout>
      <Divider style={{ padding: 1 }} />
      <Layout style={styles.container}>
        <Text appearance="hint">Region </Text>
        <Text category="p1">{_.get(user, "RegionId.region")}</Text>
      </Layout>
      <Divider style={{ padding: 1 }} />
      <Layout style={styles.container}>
        <Text appearance="hint">Capital </Text>
        <Text category="p1">{_.get(user, "RegionId.capital")}</Text>
      </Layout>
      <Divider style={{ padding: 10 }} />
      <Layout style={styles.container}>
        <Text appearance="hint">Phone Number </Text>
        <Text category="p1">0{user.Phone_no}</Text>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  contain: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  contentContainer: {},
  profileSetting: {
    padding: 16,
  },
});
export default View_user;
