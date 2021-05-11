import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

function WishList() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Yo!</Text>
            </View>
        </SafeAreaView>
    )
}

export default WishList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#191721',
        flex: 1
    },
});
