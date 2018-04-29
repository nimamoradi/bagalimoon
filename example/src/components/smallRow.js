import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'

function smallRow({title, des}) {
    return (

        <View style={styles.row}>
            <Text style={styles.des}>{des}</Text>
            <Text style={styles.text}>{title} :</Text>
        </View>

    );
}

smallRow.propTypes = {
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: vw * 4,
        margin: 20,
        fontFamily: 'B Yekan',
        alignSelf: 'flex-end'
    },
    des: {
        fontSize: vw * 4,
        margin: 20,
        fontFamily: 'B Yekan',
        alignSelf: 'flex-start'
    },
});

export default smallRow;
