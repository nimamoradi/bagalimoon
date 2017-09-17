import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';

function descriptionPan() {


    return (

            <View>
                <Text>
                    hello dolly
                </Text>
            </View>

    );
}

descriptionPan().propTypes = {

    // size: PropTypes.number.isRequired,
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

});

export default descriptionPan;
