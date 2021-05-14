import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

function FavoriteCard({ data, deleteFavorite }) {

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
        <View style={styles.container}>
            <View style={styles.cardBody}>
                <View style={styles.cardBodyTop}>
                    <View>
                        <Text style={styles.cardNameDark} numberOfLines={2}>
                            {data.name}
                        </Text>
                        <Text style={styles.coinSymbol} numberOfLines={2}>
                            {data.symbol}
                        </Text>
                    </View>
                    <View style={styles.coinDetails}>
                        <View>
                            <Text style={styles.coinRate} numberOfLines={2}>
                                {formatter.format(parseFloat(data.priceUsd))}
                            </Text>
                            <Text style={percentageDecrease ? styles.rateOfDecrease : styles.rateOfIncrease} numberOfLines={2}>
                                {increaseRate}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteFavorite(data.name)}>
                            <Icon name="star" color="#ffd56b" size={20} style={styles.favorite} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default FavoriteCard;

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
    coinRate: {
        color: "#FFF",
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
    coinDetails: {
        flexDirection: 'row'
    },
    favorite: {
        marginLeft: 10,
        marginTop: 7
    }
});

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});