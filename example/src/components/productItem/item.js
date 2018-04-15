import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import ProgressBar from 'react-native-progress/Bar';
import CountCircle from './countCircle';

import {vw, vh, vmin, vmax} from '../../viewport'

function item({title, imageUrl, onPress, price, disscount, count, onUp, onDown,off}) {

    return (
        <TouchableOpacity style={styles.halfRow}
              onPress={onPress}>
            {(disscount) ?
                <View
                    style={{
                        flex: 1,
                        height: 16 * vw,
                        width: 16 * vw,
                        zIndex: 1,
                    }}>
                    <Image
                        resizeMode="stretch"
                        source={require('../../../img/mainPage/round.png')}
                        style={{
                            zIndex: 0,
                            height: 16 * vw,
                            width: 16 * vw,
                        }}
                    />
                    <Text style={styles.discountText}>{off} %</Text>
                </View> : <View
                    style={{
                        flex: 1,
                        height: 16 * vw,
                        width: 16 * vw,
                        zIndex: 1,
                    }}/>}
            <View style={styles.row}>

                <Image
                    resizeMode="stretch"
                    indicator={ProgressBar} source={{uri: imageUrl}} style={styles.image} key={imageUrl}
                />
                <Text numberOfLines={2} style={styles.text}>{title}</Text>
                {(disscount) ? <Text style={styles.discount}>{disscount} تومان </Text> : null}
                <Text style={styles.price}>{price} تومان </Text>

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onDown}>
                        <Icon name="minus" size={vw * 11}
                              color="black"/>
                    </TouchableOpacity>


                    <CountCircle count={count}/>
                    <TouchableOpacity onPress={onUp}>
                        <Icon name="plus" size={vw * 11} color="black"/>
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
    halfRow: {
        flexDirection: 'row',
        borderColor: '#00000035',
        height: 40 * vh,
        backgroundColor: '#ebebeb',
        borderBottomWidth: 1,
        borderRadius: 5 * vh,
        shadowColor: '#eeeeee',
        borderWidth: 0.75,
        margin: vw,
        elevation: 5 * vw,
    },
    row: {
        zIndex: 0,
        flex: 10,
        right: 8 * vw,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        width: 30 * vw,
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
        height: 20 * vh,
        width: 28 * vw,
    },

    discountText: {
        zIndex: 1,
        fontSize: vw * 3.5,
        fontFamily: 'B Yekan',
        position: 'absolute',
        bottom: 7.5 * vw,
        right: 4.5 * vw,
        color: 'white',
        transform: [{rotate: '315deg'}]
    }
});

export default item;
