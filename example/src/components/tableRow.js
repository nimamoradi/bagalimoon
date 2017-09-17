import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform} from 'react-native';

function tableRow({title, des}) {
    return (

            <View style={styles.row}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text}>{des}</Text>
            </View>

    );
}

tableRow.propTypes = {
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    row: {
        height: 48,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: 16,
        margin:20,
    },
});

export default tableRow;
