import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

function TypeButton({title}) {
    return (
        <TouchableHighlight
            underlayColor={'rgba(0, 0, 0, 0.054)'}
            style={styles.row}
        >

                <Text style={styles.text}>{title}</Text>

        </TouchableHighlight>
    );
}

TypeButton.propTypes = {
    title: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({
    row: {

        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        margin: 15,
        borderRadius: 15,
        borderColor: '#349630',
        backgroundColor: '#4adc4620',
        borderWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        flex: 1,

        fontSize: 16,

    },
});

export default TypeButton;
