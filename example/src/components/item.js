import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {vw, vh, vmin, vmax} from '../viewport'

function item({title, onPress, imageUrl, price, disscount,count,onUp,onDown}) {

    if (disscount === null) {
        return (
            <TouchableOpacity

                onPress={onPress}>
                <View style={styles.row}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <Text style={styles.text}>{title}</Text>

                    <Text style={styles.price}>{price} تومان </Text>
                    <TouchableOpacity onPress={onUp}>
                        <Icon name="plus" size={vw * 4} color="#17C408" style={{margin: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDown}>
                        <Icon name="minus" size={vw * 4} color="#C42B2D" style={{margin: 10}}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    } else {

        return (
            <TouchableOpacity

                onPress={onPress}>
                <View style={styles.row}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <Text style={styles.text}>{title}</Text>

                    <Text style={styles.price}>{price} تومان </Text>

                    <Text style={styles.discount}>{disscount} تومان </Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity  onPress={onDown}>
                            <Icon name="minus" size={vw * 4} color="#C42B2D" style={{margin: 10}}/>
                        </TouchableOpacity>
                        <Text style={styles.countText}>{count}</Text>
                        <TouchableOpacity  onPress={onUp}>
                            <Icon name="plus" size={vw * 4} color="#17C408" style={{margin: 10}}/>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

item.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    disscount: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    priceView: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        height: 45 * vh,
        margin: vh,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderRadius: 5 * vh,
        borderColor: '#e8f0e8',
        borderWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.0)',
    },
    text: {
        width: '100%',
        fontSize: vw * 4.5,
        textAlign: 'center',
        fontFamily: 'B Yekan',
    },
    price: {fontFamily: 'B Yekan', flex: 1, fontSize: vw * 4, color: '#17c408', textAlign: 'left'},
    discount: {
        flex: 1,
        textDecorationLine: 'line-through',
        fontFamily: 'B Yekan',
        fontSize: vw * 4,
        color: '#d94c3d',
        textAlign: 'right'
    },
    image: {
        height: 25 * vh, width: 30 * vw, borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    }, countText: {
        fontSize: vw * 4.5,
        textAlign: 'center',
        fontFamily: 'B Yekan',
    }
});

export default item;
