import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, } from 'react-native';

function singleOpinion({title,name,opinion}) {

    return (

        <View style={styles.row}>
            <Text>{name}</Text>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.opinion}>{opinion}</Text>
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
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        padding: 20,
    },
    text: {
        fontFamily: 'B Yekan',
        fontSize: 18,
        textAlign: 'center',
    },
    opinion:{
        fontFamily: 'B Yekan',
        lineHeight: 30,
    }
});

export default singleOpinion;
