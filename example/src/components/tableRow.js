import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'

function tableRow({title, des}) {
    return (

            <View style={styles.row}>
                <Text style={styles.text}>{des}</Text>
                <Text style={styles.text}>{title} :</Text>

            </View>

    );
}

tableRow.propTypes = {
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    row: {
        
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontFamily: 'B Yekan',
        margin:20,
        fontSize: vw*5,
    },
});

export default tableRow;
