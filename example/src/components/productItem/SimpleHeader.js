import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text,} from 'react-native';


import {vw, vh, vmin, vmax} from '../../viewport'


function SimpleHeader() {


    return (
        <View style={{flexDirection: 'row', alignItems: 'flex-start', width: '100%', height: 10 * vh}}>
            <Text style={styles.tableHeader}>قیمت نهایی</Text>
            <Text style={styles.tableHeader}>قیمت عادی</Text>
            <Text style={styles.tableHeaderCount}>تعداد</Text>
            <Text style={{
                fontSize: vw * 5,
                fontFamily: 'B Yekan',
                flex: 3,
                margin: 8,
                color: '#000',
                textAlign: 'center'
            }}>نام</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    tableHeader: {
        fontSize: vw * 5,
        fontFamily: 'B Yekan',
        flex: 1,
        margin: 2,
        color: '#000',
        textAlign: 'center'
    },
    tableHeaderCount: {
        fontSize: vw * 5,
        fontFamily: 'B Yekan',
        flex: 0,
        margin: 3,
        color: '#000',
        textAlign: 'center'
    },
});

export default SimpleHeader;
