import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgCssUri } from "react-native-svg";
import Icon from "react-native-vector-icons/AntDesign";

function CoinCard({ data, theme, saveFavoriteCoin }) {

  const [isFavorite, setIsFavorite] = useState(data.isFavorite);

  let percentageDecrease = false;
  let increaseRate;
  let price = 0;

  if (data && data["1d"] && data["1d"].price_change_pct) {
    let pricePercantage24h = parseFloat(data["1d"].price_change_pct) * 100;
    if (parseFloat(data["1d"].price_change_pct) < 0) {
      percentageDecrease = true;
      increaseRate = `${pricePercantage24h.toFixed(2)}%`;
    } else {
      increaseRate = `+${pricePercantage24h.toFixed(2)}%`;
    }
  } else {
    increaseRate = "-";
  }

  if (parseFloat(data.price) < 1) {
    price = `$${data.price}`;
  } else {
    price = formatter.format(parseFloat(data.price).toFixed(2));
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardBody}>
        <View style={styles.cardBodyTop}>
          <View style={styles.nameSlot}>
            <View style={styles.logo}>
              {
                data.logo_url.includes('svg') ? <SvgCssUri
                  width={30}
                  height={30}
                  uri={data.logo_url}
                />
                  : <Image source={{ uri: data.logo_url }} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
              }
            </View>
            <View>
              <View>
                <Text style={!theme ? styles.cardNameDark : styles.cardNameLight} numberOfLines={2}>
                  {data.name}
                </Text>
              </View>
              <Text style={styles.coinSymbol} numberOfLines={2}>
                {data.symbol}
              </Text>
            </View>
          </View>
          <View style={styles.coinDetails}>
            <View>
              <Text style={!theme ? styles.coinRate : styles.coinRateLight} numberOfLines={2}>
                {price}
              </Text>
              <Text style={percentageDecrease ? styles.rateOfDecrease : styles.rateOfIncrease} numberOfLines={2}>
                {increaseRate}
              </Text>
            </View>
            <TouchableOpacity onPress={() => { setIsFavorite(!isFavorite); saveFavoriteCoin(data.name, !isFavorite) }}>
              <Icon name={data.isFavorite ? "star" : "staro"} color="#ffd56b" size={20} style={styles.favorite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View >
  );
}

export default CoinCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191721"
  },
  cardBody: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 5,
    paddingTop: 5,
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
  },
  coinDetails: {
    flexDirection: 'row'
  },
  favorite: {
    marginLeft: 10,
    marginTop: 7
  },
  nameSlot: {
    flexDirection: 'row'
  },
  rank: {
    color: '#FFF',
    marginTop: 2,
    marginRight: 5,
    fontWeight: 'bold'
  },
  logo: {
    padding: 8
  }
});

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});