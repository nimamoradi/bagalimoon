import React, {Component} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

function loadScreen() {
    return (
        <View >
            <ActivityIndicator
                color='#bc2b78'
                size="large"
                style={styles.activityIndicator}/>
        </View>
    )

}

const styles = StyleSheet.create({

    activityIndicator: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#99999910'
    }
});
export default loadScreen;