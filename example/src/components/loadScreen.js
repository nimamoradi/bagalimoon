import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
const Spinner = require('react-native-spinkit');
import {vw, vh, vmin, vmax} from '../viewport'


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
        width: 100*vw,
        height:100*vh,
        flex: 1,
        opacity:0.65,
        backgroundColor: 'grey'
    }
});
export default loadScreen;