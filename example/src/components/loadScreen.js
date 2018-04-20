import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
const Spinner = require('react-native-spinkit');


function loadScreen() {
    return (
        <View style={styles.background}>
            <Spinner color='#FF8500'
                     size={50}
                     type={'FadingCircleAlt'}
                   />
        </View>
    )

}

const styles = StyleSheet.create({

    background: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        opacity:0.65,
        backgroundColor: 'grey'
    }
});
export default loadScreen;