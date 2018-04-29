import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'
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
        flex:1,
        marginRight:2*vw,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    text: {
        fontSize:vw*5,
        backgroundColor:'#ff1d1e',
        padding:2*vw,
        color:'white',
        fontFamily: 'B Yekan',
        borderRadius: 2*vh,

    },
});


export default header;
