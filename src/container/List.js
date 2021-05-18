import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FlatList, StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import { deleteFavorite, fetchCoinList, saveFavoriteCoin, searchCoinList } from "../actions";
import CoinCard from "../components/CoinCard/CoinCard";
import EmptyList from "../components/EmptyList/EmptyList";

const List = props => {

    let initialData = {
        coins: []
    }

    const [search, setSearch] = useState('');
    const [favoriteCoins, setFavoriteCoints] = useState(initialData);

    let isFocused = useIsFocused();

    useEffect(() => {
        getFavoriteCoins();
    }, [isFocused]);

    const _renderItem = ({ item }) => {
        return <CoinCard data={item} theme={props.theme} saveFavoriteCoin={saveOrDelete} favoriteCoins={favoriteCoins} />
    };

    const _onRefresh = () => {
        getFavoriteCoins();
    }

    const onSearchChange = (value) => {
        props.searchCoins(value);
    }

    const storeFavorite = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@coins', jsonValue);
        } catch (e) {
            console.log(e)
        }
    }

    const getFavoriteCoins = async () => {
        try {
            const value = await AsyncStorage.getItem('@coins');
            props.fetchCoinList(value);
            if (value !== null) {
                let data = JSON.parse(value);
                setFavoriteCoints(data);
            }
        } catch (e) {
            // saving error
        }
    }

    const saveOrDelete = (coinName, state) => {
        if (state) {
            props.saveFavorites(coinName);
            let data = favoriteCoins.coins;
            data.push(coinName);
            let newData = {
                coins: data
            };
            setFavoriteCoints(newData);
            storeFavorite(newData);
        } else {
            let index = favoriteCoins.coins.indexOf(coinName);
            if (index > -1) {
                favoriteCoins.coins.splice(index, 1);
                storeFavorite(favoriteCoins);
            }
            props.deleteFavorites(coinName);
        }
    }

    return (
        <>
            <TextInput
                style={props.theme ? styles.inputLight : styles.inputDark}
                value={search}
                onChangeText={(e) => { onSearchChange(e), setSearch(e) }}
                placeholder="Search..."
                placeholderTextColor={props.theme ? "#000" : "#66666B"}
            />
            <FlatList
                data={props.coinData}
                renderItem={_renderItem}
                showsVerticalScrollIndicator={false}
                snapToAlignment={'start'}
                decelerationRate={'fast'}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={() => _onRefresh()}
                refreshing={props.loading}
                ListEmptyComponent={props.loading ? "" : <EmptyList theme={props.theme} />}
                extraData={props.coinData}
            />
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCoinList: (data) => {
            dispatch(fetchCoinList(data));
        },
        searchCoins: (query) => {
            dispatch(searchCoinList(query))
        },
        saveFavorites: (name) => {
            dispatch(saveFavoriteCoin(name))
        },
        deleteFavorites: (name) => {
            dispatch(deleteFavorite(name))
        }
    };
};

const mapStateToProps = state => {
    return {
        coinData: state.coinData,
        loading: state.loading
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

const styles = StyleSheet.create({
    inputDark: {
        marginTop: 20,
        marginBottom: 12,
        marginLeft: 12,
        marginRight: 12,
        color: '#fff',
        fontSize: 18,
        backgroundColor: "#262530",
        borderRadius: 50,
        padding: 10
    },
    inputLight: {
        marginTop: 20,
        marginBottom: 12,
        marginLeft: 12,
        marginRight: 12,
        color: '#fff',
        fontSize: 18,
        backgroundColor: "#F0F0F0",
        borderRadius: 50,
        padding: 15
    },
});