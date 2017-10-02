import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight,Dimensions, Platform} from 'react-native';

function tableRowLong({title, des}) {
    return (

        <View style={styles.row}>
            <Text style={styles.des}>{des}</Text>
            <Text style={styles.text}>{title} :</Text>

        </View>

    );
}

tableRowLong.propTypes = {
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    row: {
        width:  Dimensions.get('window').width,
        paddingHorizontal: 16,
        flexDirection: 'row',

        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: 16,
        margin: 20,
        alignSelf:'flex-end'
    },
    des: {
        fontSize: 16,
        margin: 20,
        alignSelf:'flex-start'
    },
});

export default tableRowLong;
