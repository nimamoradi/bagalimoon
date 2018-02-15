import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PropTypes from 'prop-types';

import {vw, vh, vmin, vmax} from '../viewport'

function productPageNavBar({basket, context}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => context.props.navigator.pop()}>
                <Ionicons name="ios-arrow-back" size={vw * 8} color="white" style={{margin: 10,}}/>
            </TouchableOpacity>

            <View style={{flex: 1}}/>
            <Text style={styles.text}>لیست محصولات</Text>
            <View style={{flex: 1}}/>

            <TouchableOpacity onPress={basket}>
                <Icon name="shopping-basket" size={vw * 8} color="white" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ff0030',
        borderRadius: vw * 3,
        marginTop: vh,
        marginRight: vh,
        marginLeft: vh,
        borderBottomColor: 'rgba(0, 0, 0, 0.0)',
    },
    text: {
        fontSize: vw * 6,
        backgroundColor: '#ff1d1e',
        padding: 2 * vw,
        color: 'white',
        fontFamily: 'B Yekan',

    },

});


productPageNavBar.propTypes = {
    basket: PropTypes.func.isRequired,
};
export default productPageNavBar;