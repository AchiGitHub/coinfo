import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { saveFavoriteCoins } from '../actions';
import PopUpModal from '../components/Modal/PopUpModal';

function WishList(props) {

    const [modalStatus, setModalStatus] = useState(false);

    const saveFavoriteCoin = (coinName) => {
        let coins = props.favoriteCoins.push(coinName);
        let coinObject = {
            coins: coins
        };
        saveFavoriteCoins(coins);
        storeFavorite(coinObject);
        setModalStatus(false);
    }

    const deleteFavoriteCoin = (coinName) => {

    }

    const storeFavorite = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@coins', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Favorites</Text>
                <View style={styles.themeToggle}>
                    <TouchableOpacity onPress={() => setModalStatus(!modalStatus)}>
                        <Icon name="plus" color="#fff" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <PopUpModal data={props.coinData} saveFavoriteCoin={saveFavoriteCoin} modalStatus={modalStatus} setModalStatus={setModalStatus} />
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        coinData: state.coinData,
        favoriteCoins: state.favoriteCoins
    };
};

export default connect(
    mapStateToProps,
    null
)(WishList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191721',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        padding: 10
    },
    themeToggle: {
        position: 'absolute',
        top: 10,
        right: 15
    },
});
