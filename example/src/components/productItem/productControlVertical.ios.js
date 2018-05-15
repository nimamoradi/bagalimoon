import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {vw,} from '../../viewport'
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CountCircle from './countCircle';


function productControlVertical({count, onUp, onDown}) {
    if (count > 0)
        return  <View style={{
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',
        }}>
            <TouchableOpacity onPress={onUp}>
                <Icon name="plus" size={vw * 8} color="black" style={{margin: 10,backgroundColor: 'transparent',}}/>
            </TouchableOpacity>

            <CountCircle count={count}/>
            <TouchableOpacity onPress={onDown}>
                <Icon name="minus" size={vw * 8} color="black" style={{margin: 10,backgroundColor: 'transparent',}}/>
            </TouchableOpacity>

        </View>;

    return <TouchableOpacity onPress={onUp}>
        <MaterialIcons name="add-shopping-cart" style={{backgroundColor: 'transparent',}} size={vw * 11} color="green"/>
    </TouchableOpacity>
}

productControlVertical.propTypes = {
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

export default productControlVertical;
