import React from 'react';

import {StyleSheet, View, Text, TouchableHighlight, Button, Image, Dimensions, AsyncStorage} from 'react-native';

import {vw, vh, vmin, vmax} from '../viewport'

class Triangle extends React.Component {

    render() {
        return (
            <View style={[styles.triangle, this.props.style]} />
        );
    }


}



const styles = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth:  15*vw,
        borderRightWidth:  15*vw,
        borderBottomWidth:  30*vw,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#e7e6e6'
    }
});


export default Triangle;
