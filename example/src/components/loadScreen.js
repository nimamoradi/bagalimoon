import React, {Component} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

function loadScreen() {
    return (
        <View style={styles.background}>
            <UIActivityIndicator color='red'

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
    },
    background:{
        flex:1,
        backgroundColor:'#a5aaa970'
    }
});
export default loadScreen;