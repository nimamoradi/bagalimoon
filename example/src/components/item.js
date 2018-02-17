import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import {vw, vh, vmin, vmax} from '../viewport'

function item({title, imageUrl, onPress, price, disscount, count, onUp, onDown}) {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.row}>

                <Image source={{uri: imageUrl}} style={styles.image} key={imageUrl}
                />


                <Text numberOfLines={2} style={styles.text}>{title}</Text>

                <Text style={styles.price}>{price} تومان </Text>
                {(disscount) ? <Text style={styles.discount}>{disscount} تومان </Text> : null}
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onDown}>
                        <Icon name="minus" size={vw * 8} style={{}}
                              color="black" />
                    </TouchableOpacity>


                    {(count !== 0) ? <Text style={styles.countText}>{count}</Text> :
                        <Text style={styles.countTextHidden}>0</Text>}
                    <TouchableOpacity onPress={onUp} style={{borderRadius: 20}}>
                        <Icon name="plus" size={vw * 8} color="black" style={{}}/>
                    </TouchableOpacity>

                </View>

            </View>
        </TouchableOpacity>
    );


}

item.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    disscount: PropTypes.number,
    imageUrl: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        elevation: 5 * vw,
        paddingBottom: vh,
        borderColor: '#00000035',
        height: 45 * vh,
        margin: 2*vh,
        padding:2*vw,
        backgroundColor: '#ebebeb',
        paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderRadius: 5 * vh,
        shadowColor: '#eeeeee',
        borderWidth: 0.5,
    },
    text: {
        width: 40*vw,
        fontSize: vw * 4.5,
        textAlign: 'center',
        fontFamily: 'B Yekan',
        color: 'black',
    },
    price: {
        fontFamily: 'B Yekan',
        flex: 1, fontSize: vw * 4,
        color: 'black',
        textAlign: 'left'
    },
    discount: {
        flex: 1,
        textDecorationLine: 'line-through',
        fontFamily: 'B Yekan',
        fontSize: vw * 4,
        color: '#d94c3d',
        textAlign: 'right'
    },
    image: {
        height: 25 * vh,
        width: 35 * vw,
        borderRadius: 20,
        borderWidth: 0.5,
    },
    countText: {
        backgroundColor:'red',
        color:'white',
        fontSize: vw * 4.5,
        fontFamily: 'B Yekan',
        width:6*vw,
        height:6*vw,
        textAlign: 'center',
        borderRadius:3*vw
    },
    countTextHidden: {
        backgroundColor:'red',
        fontSize: vw * 4.5,
        width:6*vw,
        height:6*vw,
        borderRadius:3*vw,
        fontFamily: 'B Yekan',
        opacity:0
    }
});

export default item;
