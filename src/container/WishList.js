import React, { useState, useEffect } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import FavoriteCard from '../components/FavoriteCard/FavoriteCard';
import { AdMobBanner, PublisherBanner } from 'react-native-admob';
import { deleteFavorite } from '../actions';

function WishList(props) {

    const [favorites, setFavorites] = useState([]);
    const [favoriteCoinData, setfavoriteCoinData] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        getFavoriteCoins();
    }, [isFocused]);

    const getFavoriteCoins = async () => {
        try {
            const value = await AsyncStorage.getItem('@coins')
            if (value !== null) {
                let data = JSON.parse(value);
                setFavorites(data.coins);
                setFavoriteData(data.coins);
            }
        } catch (e) {
            // saving error
        }
    }

    const setFavoriteData = (data) => {
        const filteredArray = props.coinData.filter((el) => {
            return data.some((f) => {
                return f === el.name;
            });
        });
        setfavoriteCoinData(filteredArray);
    }

    const _renderItem = ({ item }) => {
        return <FavoriteCard data={item} deleteFavorite={deleteFavorite} />
    };

    const deleteFavorite = (name) => {
        let index = favorites.indexOf(name);
        if (index > -1) {
            favorites.splice(index, 1);
            let newData = {
                coins: favorites
            };

            setFavoriteData(newData.coins);
            storeFavorite(newData);
            props.deleteFavorites(name);
        }
    }

    const storeFavorite = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@coins', jsonValue);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Favorites</Text>
            </View>
            <FlatList
                data={favoriteCoinData}
                renderItem={_renderItem}
                showsVerticalScrollIndicator={false}
                snapToAlignment={'start'}
                decelerationRate={'fast'}
                keyExtractor={(item, index) => index.toString()}
            // onRefresh={() => _onRefresh()}
            // refreshing={props.loading}
            // ListEmptyComponent={props.loading ? "" : <EmptyList theme={props.theme} />}
            />
            <View style={styles.adSlot}>
                <AdMobBanner
                    adSize="mediumBanner"
                    // adUnitID="ca-app-pub-3940256099942544/6300978111" //test ad id
                    adUnitID="ca-app-pub-8167817804987450/7911429163"  //production id
                    testDeviceID={[PublisherBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)}
                    onAppEvent={event => console.log(event.name, event.info)}
                />
            </View>
        </SafeAreaView>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        deleteFavorites: (name) => {
            dispatch(deleteFavorite(name))
        }
    };
};

const mapStateToProps = state => {
    return {
        coinData: state.coinData
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
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
    adSlot: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10
    }
});
