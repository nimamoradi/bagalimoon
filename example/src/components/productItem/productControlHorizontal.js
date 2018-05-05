import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {vw,} from '../../viewport'
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CountCircle from './countCircle';
import item from "./item";

function productControlHorizontal({count, onUp, onDown}) {
    if (count > 0)
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onDown}>
                <Icon name="minus" size={vw * 11}
                      color="black"/>
            </TouchableOpacity>


            <CountCircle count={count}/>
            <TouchableOpacity onPress={onUp}>
                <Icon name="plus" size={vw * 11} color="black"/>
            </TouchableOpacity>

        </View>;

    return <TouchableOpacity onPress={onUp}>
        <MaterialIcons name="add-shopping-cart" size={vw * 11} color="green"/>
    </TouchableOpacity>
}

productControlHorizontal.propTypes = {
    onUp: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    onDown: PropTypes.func.isRequired,

};
const styles = StyleSheet.create({
    countZero: {
        backgroundColor: '#28aa25',
        fontSize: vw * 4.5,
        width: 28 * vw,
        height: 7 * vw,
        borderRadius: 4 * vw,
        fontFamily: 'B Yekan',
    },

});

export default productControlHorizontal;
