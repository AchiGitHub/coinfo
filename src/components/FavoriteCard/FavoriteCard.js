import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function FavoriteCard({ name, addToFavorite }) {
    return (
        <TouchableOpacity style={styles.cardBody} onPress={() => addToFavorite(name)}>
            <Text style={styles.cardNameDark} numberOfLines={2}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default FavoriteCard

const styles = StyleSheet.create({
    cardBody: {
        margin: 12
    },
    cardNameDark: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center'
    },
});
