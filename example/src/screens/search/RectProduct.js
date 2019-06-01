import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import {vw, vh, vmin, vmax} from '../../viewport'
import ProgressBar from 'react-native-progress/Bar';

import CountCircle from '../../components/productItem/countCircle';
import ProductControl from '../../components/productItem/productControlVertical'

function RectProduct({title, onUp, onDown, imageUrl, price, count, disscount, off}) {


    return (

        <View
            style={styles.container}
        >
            <Image
                resizeMode="stretch"
                indicator={ProgressBar}
                source={{uri: imageUrl}} style={styles.image}/>

            <ProductControl count={count} onUp={onUp} onDown={onDown}/>


            <View style={{flexDirection: 'column',}}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.price}>{price} تومان </Text>
                {(disscount) ? <Text style={styles.discount}>{disscount} تومان </Text> : null}
            </View>

            {(disscount) ?
                <View
                    style={{
                        position: 'absolute',
                        bottom: 18 * vh,
                        right: 75 * vw,
                        height: 12 * vw,
                        width: 12 * vw,
                        zIndex: 1,
                        borderRadius: 8 * vw,
                        backgroundColor: '#ff4c4c',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>

                    <Text style={{
                        fontFamily: 'B Yekan',
                        fontSize: vw * 4,
                    }}>{off} %</Text>
                </View> : null}
        </View>

    );

}

RectProduct.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    disscount: PropTypes.number,
    imageUrl: PropTypes.string.isRequired,
    onUp: PropTypes.func.isRequired,
    onDown: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    shadowMaker: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90 * vw,
        height: 45 * vw,
        backgroundColor: '#f9f9f9',
        marginRight: 5 * vw,
        marginLeft: 5 * vw,
        borderRadius: 4 * vw,
        padding: 4 * vw,
        borderWidth: 0.75,
        elevation: 2 * vw,
        borderColor: '#00000035',


    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        borderRadius: 5 * vh,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        backgroundColor: '#e7e6e6',
        padding: 4 * vw,
        margin: 2 * vw,
        width: 69 * vw,
        flexDirection: 'row',
        borderBottomWidth: vw,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontFamily: 'B Yekan',
        fontSize: vw * 4,
        color: 'black',
        width: 35 * vw

    },
    price: {
        fontSize: vw * 4,
        color: 'black',
        fontFamily: 'B Yekan',
        width: 35 * vw,
        textAlign: 'left', marginRight: 10
    },
    discount: {
        textDecorationLine:
            'line-through',
        fontSize: vw * 4,
        color: '#d94c3d',
        fontFamily: 'B Yekan', textAlign: 'left', marginRight: 10

    },
    image: {
        height: 33*vw,
        width: 25*vw,
        margin: 2 * vw,
    },
    countTextHidden: {
        backgroundColor: 'red',
        fontSize: vw * 4.5,
        width: 6 * vw,
        height: 6 * vw,
        borderRadius: 3 * vw,
        opacity: 0
    },

});

export default RectProduct;
