import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'
let backgroundColorOriginal='#349630';
function TypeButton({title, onPress,backgroundColor}) {
if(backgroundColor===null)
    backgroundColor='#4adc4640';

    return (
        <TouchableOpacity
            underlayColor={'rgba(0, 0, 0, 0.054)'}
            style={{
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                margin: 5,
                borderRadius: 15,
                borderColor: '#349630',
                backgroundColor: backgroundColorOriginal,
                borderWidth: 0.5,
                borderBottomColor: 'rgba(0, 0, 0, 0.054)',
            }}
            onPress={onPress}
        >

            <Text style={styles.text}>{title}</Text>

        </TouchableOpacity>
    );
}

TypeButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    backgroundColor:PropTypes.string
};

const styles = StyleSheet.create({
    row: {
fontSize:vw*3,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        margin: 15,
        borderRadius: 15,
        borderColor: '#349630',
        borderWidth: 0.5,

        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 4*vw,
        color:'white',
        fontFamily: 'B Yekan',
    },
});

export default TypeButton;
