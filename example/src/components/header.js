import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';

function header({title}) {
    return (

        <View style={styles.row}>
            <Text style={styles.text}>{title}</Text>
        </View>

    );
}

header.propTypes = {
    title: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({
    row: {

        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(5, 5, 5, 0.054)',
    },
    text: {
        fontSize: 23,
        fontWeight:'900'
    },
});


export default header;
