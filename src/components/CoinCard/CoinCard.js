import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

function CoinCard({ data, theme }) {

  let percentageDecrease = false;
  let increaseRate;

  if (!!data.changePercent24Hr) {
    if (data.changePercent24Hr.includes("-")) {
      percentageDecrease = true;
      increaseRate = `${parseFloat(data.changePercent24Hr).toFixed(2)}%`;
    } else {
      increaseRate = `+${parseFloat(data.changePercent24Hr).toFixed(2)}%`;
    }
  } else {
    increaseRate = "-";
  }

  return (
    <View style={!theme ? styles.container : styles.containerLight}>
      <View style={!theme ? styles.cardBody : styles.cardBodyLight}>
        <View style={styles.cardBodyTop}>
          <View>
            <Text style={!theme ? styles.cardNameDark : styles.cardNameLight} numberOfLines={2}>
              {data.name}
            </Text>
            <Text style={styles.coinSymbol} numberOfLines={2}>
              {data.symbol}
            </Text>
          </View>
          <View>
            <Text style={!theme ? styles.coinRate : styles.coinRateLight} numberOfLines={2}>
              {formatter.format(parseFloat(data.priceUsd))}
            </Text>
            <Text style={percentageDecrease ? styles.rateOfDecrease : styles.rateOfIncrease} numberOfLines={2}>
              {increaseRate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CoinCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191721"
  },
  cardContainer: {
    padding: 15,
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 15
  },
  cardBody: {
    padding: 20,
    backgroundColor: "#191721",
    borderBottomColor: "#15151F",
    borderBottomWidth: 4
  },
  cardBodyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: 'center'
  },
  cardNameDark: {
    color: "#D0CFD2",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: 'Cochin'
  },
  cardNameLight: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: 'Cochin'
  },
  coinRate: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
  },
  coinRateLight: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
  },
  cardAddress: {
    color: "gray",
    fontSize: 15,
    fontWeight: "500"
  },
  cardAvatar: {
    height: 130,
    width: 100,
    backgroundColor: "gray"
  },
  dateContainer: {
    flexDirection: "row"
  },
  seperator: {
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 8
  },
  rateOfIncrease: {
    color: "#59BC6E",
    fontSize: 14,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  rateOfDecrease: {
    color: '#DA583F',
    fontSize: 14,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  coinSymbol: {
    color: "#BBB6BB",
    fontSize: 14,
    fontWeight: '400',
  },
  containerLight: {},
  cardBodyLight: {
    padding: 20,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 4
  }
});

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});