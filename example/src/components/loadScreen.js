import React, {Component} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';


function loadScreen() {
     return (
        <View style={styles.container}>
            <ActivityIndicator
                color='#bc2b78'
                size="large"
                style={styles.activityIndicator}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee70',
        borderRadius: 5,
        padding: 16,

    },
    activityIndicator: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',

    }
});
export default loadScreen;