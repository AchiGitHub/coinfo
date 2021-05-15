import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

function CoinCard({ data, theme, favoriteCoins, saveFavoriteCoin }) {

  const [isFavorite, setIsFavorite] = useState(false);

  let percentageDecrease = false;
  let increaseRate;

  if (!!data.quote.USD.percent_change_1h) {
    if (data.quote.USD.percent_change_1h < 0) {
      percentageDecrease = true;
      increaseRate = `${(data.quote.USD.percent_change_1h).toFixed(2)}%`;
    } else {
      increaseRate = `+${(data.quote.USD.percent_change_1h).toFixed(2)}%`;
    }
  } else {
    increaseRate = "-";
  }

  useEffect(() => {
    if (favoriteCoins.coins.includes(data.name)) {
      setIsFavorite(true);
    }
  }, [favoriteCoins.coins])

  return (
    <View style={!theme ? styles.container : styles.containerLight}>
      <View style={!theme ? styles.cardBody : styles.cardBodyLight}>
        <View style={styles.cardBodyTop}>
          <View>
            <View style={styles.nameSlot}>
              <Text style={styles.rank}>
                {`${data.cmc_rank}). `}
              </Text>
              <Text style={!theme ? styles.cardNameDark : styles.cardNameLight} numberOfLines={2}>
                {data.name}
              </Text>
            </View>
            <Text style={styles.coinSymbol} numberOfLines={2}>
              {data.symbol}
            </Text>
          </View>
          <View style={styles.coinDetails}>
            <View>
              <Text style={!theme ? styles.coinRate : styles.coinRateLight} numberOfLines={2}>
                {formatter.format(parseFloat(data.quote.USD.price))}
              </Text>
              <Text style={percentageDecrease ? styles.rateOfDecrease : styles.rateOfIncrease} numberOfLines={2}>
                {increaseRate}
              </Text>
            </View>
            <TouchableOpacity onPress={() => { setIsFavorite(!isFavorite); saveFavoriteCoin(data.name) }}>
              <Icon name={isFavorite ? "star" : "staro"} color="#ffd56b" size={20} style={styles.favorite} />
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
  cardContainer: {
    padding: 15,
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 15
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
  }
});

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});