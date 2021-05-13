import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WishList(props) {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavoriteCoins();
    }, []);

    const getFavoriteCoins = async () => {
        try {
            const value = await AsyncStorage.getItem('@coins')
            if (value !== null) {
                let data = JSON.parse(value);
                setFavorites(data.coins);
            }
        } catch (e) {
            // saving error
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Favorites</Text>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        coinData: state.coinData
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
