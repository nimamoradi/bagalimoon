import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, } from 'react-native';

function singleOpinion({title,name,opinion}) {

    return (

        <View>
            <Text>{name}</Text>
            <Text style={styles.text}>{title}</Text>
            <Text>{opinion}</Text>
        </View>

    );
}

singleOpinion.propTypes = {
    title: PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    opinion:PropTypes.string.isRequired,
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
        fontSize: 18,
        textAlign: 'center',
    },
});

export default singleOpinion;
