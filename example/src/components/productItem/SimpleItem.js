import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text,} from 'react-native';


import {vw, vh, vmin, vmax} from '../../viewport'


function SimpleItem({final_price, regular_price, count, name}) {


    return (
        <View style={styles.row}>

            <Text style={styles.price}>{final_price}</Text>
            <Text style={styles.price}>{regular_price}</Text>
            <Text style={styles.count}>{count}</Text>
            <Text style={styles.text}>{name}</Text>
        </View>
    );
}

SimpleItem.propTypes = {
    regular_price: PropTypes.number.isRequired,
    final_price: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    row: {
        elevation: 2 * vw,
        borderColor: '#00000035',
        borderWidth: 0.75,
        margin: vw,
        borderRadius: 2 * vw,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        backgroundColor: '#e7e6e6',
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: vw * 4,
        flex: 3,
        width: 12 * vw,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    },
    price: {
        margin: 5,
        fontSize: vw * 4,
        flex: 1,
        fontFamily: 'B Yekan',
        textAlign: 'center'
    },
    count: {
        margin: 5,
        fontSize: vw * 4,
        flex: 0,
        fontFamily: 'B Yekan',
        textAlign: 'center'
    },
});

export default SimpleItem;
