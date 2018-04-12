import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {vw, vh, vmin, vmax} from '../../viewport'
import ProgressBar from 'react-native-progress/Pie';
import CountCircle from './countCircle';


function itemView({title, onUp, onDown, imageUrl, price, count, disscount,}) {


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
                        <Text style={styles.discountText}>{price / disscount * 100} %</Text>
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
                        resizeMode="stretch"
                        indicator={ProgressBar}
                        source={{uri: imageUrl}} style={styles.image}/>

                    <View style={{flexDirection: 'column',}}>
                        <Text style={styles.text}>{title}</Text>
                        <Text style={styles.discount}>{disscount} تومان </Text>
                        <Text style={styles.price}>{price} تومان </Text>
                    </View>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <TouchableOpacity onPress={onUp}>
                            <Icon name="plus" size={vw * 8} color="black" style={{margin: 10}}/>
                        </TouchableOpacity>

                        <CountCircle count={count}/>
                        <TouchableOpacity onPress={onDown}>
                            <Icon name="minus" size={vw * 8} color="black" style={{margin: 10}}/>
                        </TouchableOpacity>
                    </View>
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
        width: 70 * vw,
        height: 45 * vw


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
        width: 25 * vw
    },
    price: {fontSize: vw * 4, color: 'black', fontFamily: 'B Yekan', textAlign: 'left', marginRight: 10},
    discount: {
        textDecorationLine:
            'line-through',
        fontSize: vw * 4,
        color: '#d94c3d',
        fontFamily: 'B Yekan', textAlign: 'left', marginRight: 10

    },
    image: {
        height: Dimensions.get('window').width / 3,
        width: Dimensions.get('window').width / 4,
        margin: 2 * vw,
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
        fontSize: vw * 3.5,
        fontFamily: 'B Yekan',
        position: 'absolute',
        bottom: 7.5 * vw,
        right: 4.5 * vw,
        color: 'white',
        transform: [{rotate: '315deg'}]
    }
});

export default itemView;
