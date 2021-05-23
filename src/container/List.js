import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/FontAwesome";

import { deleteFavorite, fetchCoinList, saveFavoriteCoin, searchCoinList, sortList } from "../actions";
import CoinCard from "../components/CoinCard/CoinCard";
import EmptyList from "../components/EmptyList/EmptyList";

const List = props => {

    let initialData = {
        coins: []
    }

    const [search, setSearch] = useState('');
    const [favoriteCoins, setFavoriteCoints] = useState(initialData);
    const [selectedFilter, setSelectedFilter] = useState();
    const [listLoading, setListLoading] = useState(false);

    let isFocused = useIsFocused();

    useEffect(() => {
        getFavoriteCoins();

        return () => {
            setSelectedFilter('rank');
            setSearch('');
        }
    }, [isFocused]);

    const _renderItem = ({ item }) => {
        return <CoinCard data={item} theme={props.theme} saveFavoriteCoin={saveOrDelete} favoriteCoins={favoriteCoins} />
    };

    const _onRefresh = () => {
        getFavoriteCoins();
        setSearch('');
        setSelectedFilter('rank');
    }

    const onSearchChange = (value) => {
        props.searchCoins(value);
    }

    const storeFavorite = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@coins', jsonValue);
        } catch (e) {
            // console.log(e)
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

    const sortCoinList = (itemValue) => {
        setSelectedFilter(itemValue);
        props.sortList(itemValue);
        setListLoading(true);

        setTimeout(() => {
            setListLoading(false);
        }, 500)
    }

    return (
        <>
            <View style={styles.pickerContainer}>
                <View style={styles.searchBar} >
                    <TextInput
                        style={styles.inputDark}
                        value={search}
                        onChangeText={(e) => { onSearchChange(e), setSearch(e) }}
                        placeholder="Search..."
                        placeholderTextColor={props.theme ? "#000" : "#66666B"}
                    />
                </View>
                <View style={styles.pickerWrapper}>
                    <Icon name={"bars"} color="#66666B" size={25} style={styles.filters} />
                    <Picker
                        selectedValue={selectedFilter}
                        onValueChange={(itemValue, itemIndex) =>
                            sortCoinList(itemValue)
                        }
                        dropdownIconColor="#191721"
                        style={styles.picker}
                    // numberOfLines={2}
                    >
                        <Picker.Item label="Rank" value="rank" />
                        <Picker.Item label="Price : High ~ Low" value="dsc" />
                        <Picker.Item label="Price : Low ~ High" value="asc" />
                    </Picker>
                </View>
            </View>
            <FlatList
                data={props.coinData}
                renderItem={_renderItem}
                showsVerticalScrollIndicator={false}
                snapToAlignment={'start'}
                decelerationRate={'fast'}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={() => _onRefresh()}
                refreshing={props.loading || listLoading}
                ListEmptyComponent={props.loading ? "" : <EmptyList theme={props.theme} />}
                extraData={props.coinData}
                keyboardShouldPersistTaps={'handled'}
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
        },
        sortList: (name) => {
            dispatch(sortList(name))
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
        marginTop: 5,
        marginRight: 8,
        color: '#fff',
        fontSize: 18,
        backgroundColor: "#262530",
        borderRadius: 50,
        padding: 14
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
    picker: {
        color: "#66666B",
        height: 10
    },
    pickerWrapper: {
        borderColor: "#191721",
        borderWidth: 1,
        backgroundColor: "#191721",
        borderRadius: 30,
        width: 50,
        height: 55,
        top: 5,
        flex: 1
    },
    pickerContainer: {
        marginHorizontal: 12,
        marginVertical: 6,
        flexDirection: 'row',
    },
    searchBar: {
        flex: 10
    },
    filters: {
        position: 'absolute',
        top: 12,
        right: 8,
        zIndex: 999
    }
});