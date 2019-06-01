import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, ImageBackground, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { vw, vh, vmin, vmax } from '../../viewport'
import ProgressBar from 'react-native-progress/Pie';

import ProductControl from '../../components/productItem/productControlVertical'

function itemView({ title, onUp, onDown, imageUrl, price, count, disscount, off }) {


    return (
        <ImageBackground
            resizeMode="stretch"
            style={styles.container}
            source={require('../../../img/itemViewBack.png')}
        >
            <View style={{
                height: 16 * vw,
                width: 16 * vw,
                zIndex: 2,
            }}>
                {(disscount) ?
                    <View>
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
                    </View> : null}
            </View>
            <View
                style={{
                    right: 10 * vh,
                }}>
                <View style={{
                    flexDirection: 'row', flex: 1,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image
                        resizeMethod="resize"
                        indicator={ProgressBar}
                        source={{ uri: imageUrl }} style={styles.image} />

                    <View style={{ flexDirection: 'column', width: 25 * vw }}>
                        <Text adjustsFontSizeToFit style={styles.text}>{title}</Text>

                        {(disscount) ?
                            <Text numberOfLines={1} style={styles.discount}>{disscount} تومان </Text> : null}
                        <Text numberOfLines={1} style={styles.price}>{price} تومان </Text>

                    </View>


                    <ProductControl count={count} onUp={onUp} onDown={onDown} />

                </View>
            </View>

        </ImageBackground>

    );

}

itemView.propTypes = {
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
        flexDirection: 'row',
        width: 72 * vw,
        height: 45 * vw


    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
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
        height: 40 * vw
    },
    text: {
        textAlignVertical: "center",
        fontFamily: 'B Yekan',
        fontSize: vw * 3.75,
        color: 'black',
        flex: 3,
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    price: {
        fontSize: vw * 4,
        flex: 1,
        backgroundColor: 'transparent',
        color: 'black', fontFamily: 'B Yekan', textAlign: 'right',
    },
    discount: {
        textDecorationLine:
            'line-through',
        backgroundColor: 'transparent',
        flex: 1,
        fontSize: vw * 4,
        color: '#d94c3d',
        fontFamily: 'B Yekan', textAlign: 'right',

    },
    image: {
        height: 35 * vw,
        width: 25 * vw,
        margin: 2 * vw,
        marginLeft: 4 * vw,
    },
    countTextHidden: {
        backgroundColor: 'red',
        fontSize: vw * 4.5,
        width: 6 * vw,
        height: 6 * vw,
        borderRadius: 3 * vw,
        fontFamily: 'B Yekan',
        opacity: 0
    },
    discountText: {
        zIndex: 1,
        fontSize: vw * 4,
        fontFamily: 'B Yekan',
        position: 'absolute',
        backgroundColor: 'transparent',
        bottom: 8 * vw,
        right: 4.5 * vw,
        color: 'white',
        transform: [{ rotate: '315deg' }]
    }
});

export default itemView;
