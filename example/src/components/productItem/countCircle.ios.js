import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import {vw,} from '../../viewport'
import basketFinal from "../../screens/basket/basketFinal";

function countCircle({count}) {
    if (count !== 0)
        return <Text style={styles.countText}>{count}</Text>;
    else
        return <Text style={styles.countTextHidden}>0</Text>;
}

//
// countCircle.propTypes = {
//     count: PropTypes.number().isRequired,
// };


const styles = StyleSheet.create({
    countText: {
        color: 'black',
        fontSize: vw * 4.5,
        fontFamily: 'B Yekan',
        width: 8 * vw,
        height: 8 * vw,
        borderRadius: 4 * vw,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: vw * 0.4,
        backgroundColor: 'transparent',
    },
    countTextHidden: {
        backgroundColor: 'red',
        backgroundColor: 'transparent',
        fontSize: vw * 4.5,
        width: 8 * vw,
        height: 8 * vw,
        borderRadius: 4 * vw,
        fontFamily: 'B Yekan',
        opacity: 0
    },

});

export default countCircle;
