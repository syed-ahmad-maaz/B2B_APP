import React, { useEffect, useState } from "react";
import { fetchOffer } from "../../Services/UpcomingOffer";
import { REACT_APP_HEROKU } from "@env";
import { Layout, Text, Card } from "@ui-kitten/components";
import Style from "../CategoriesComponents/CategoriesStyle";
import { ImageBackground, ScrollView } from "react-native";
import metroHost from "../../Services/metroHost";
const Offer_form = () => {
  const [offer, setOffer] = useState([]);
  useEffect(() => {
    fetchOffer().then((items) => {
      setOffer(items);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={Style.spacing}>
      {offer.map((items) => (
        <Layout style={{ paddingBottom: 10 }}>
          <Card
            style={{ height: 200, width: 150 }}
            header={() => (
              <ImageBackground
                // source={{ uri: `${REACT_APP_HEROKU}/${items.OfferImage}` }}
                source={{
                  uri: `http://192.168.43.188:5000/${items.OfferImage}`,
                }}
                style={Style.itemHeader}
              />
            )}
            footer={() => (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {items.description}
              </Text>
            )}
          ></Card>
        </Layout>
      ))}
    </ScrollView>
  );
};
export default Offer_form;
