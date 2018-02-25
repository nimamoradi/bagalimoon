import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {vw, vh, vmin, vmax} from '../viewport'

function SimpleNavbar({back, title}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={back}>
                <Ionicons name="ios-arrow-back" size={vw * 8} color="white" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>

            <Text style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center', fontSize: 5 * vw, color: 'white'
            }}>{title}</Text>
            <View style={{flex: 0.75}}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90 * vw,
        height: 8 * vh,
        flexDirection: 'row',
        backgroundColor: '#ff0030',
        borderRadius: vw * 3,
        margin:2*vw ,
        marginRight:5*vw,
        marginLeft:5*vw,
        borderBottomColor: 'rgba(0, 0, 0, 0.0)',
    }

});


SimpleNavbar.propTypes = {
    back: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
export default SimpleNavbar;