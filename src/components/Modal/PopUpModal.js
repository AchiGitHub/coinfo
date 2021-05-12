import React, { useState } from 'react'
import { Modal, StyleSheet, Text, Pressable, View, ScrollView, FlatList, Dimensions } from "react-native";

import FavoriteCard from '../FavoriteCard/FavoriteCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function PopUpModal({ data, saveFavoriteCoin, modalStatus, setModalStatus }) {

    const _renderItem = ({ item }) => {
        return <FavoriteCard name={item.name} addToFavorite={saveFavoriteCoin} />
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalStatus}
            onRequestClose={() => {
                setModalStatus(!modalStatus);
            }}
        >
            <View style={styles.container}>
                <View style={[styles.modal, { width: WIDTH - 20, height: HEIGHT / 2 }]}>
                    <FlatList
                        data={data}
                        renderItem={_renderItem}
                        showsVerticalScrollIndicator={false}
                        snapToAlignment={'start'}
                        decelerationRate={'fast'}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default PopUpModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: '#1F1D27'
    }
});