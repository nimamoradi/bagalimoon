import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'

function itemView({title, onUp, onDown, imageUrl, price, count, onPress, disscount,}) {


    return (
        <View style={{}}>
            {(count !== 0) ? <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                padding: 4 * vw,
                backgroundColor: '#F8222E20',
                right: 0,
                bottom: 0,
                borderWidth: 0.5,
                margin: 2 * vw,
                borderBottomWidth: vw,
                borderRadius: 5 * vh,
                borderColor: '#e8f0e8',
                justifyContent: 'center',
                alignItems: 'center'
            }}/> : null}
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignSelf: 'flex-end',}}>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text
                            editable={false} selectTextOnFocus={false}
                            style={{textAlign: 'center', fontFamily: 'B Yekan', fontSize: vw * 4}}>
                            {count}
                        </Text>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={styles.text}>{title}</Text>
                            <TouchableOpacity onPress={onUp}>
                                <Icon name="plus" size={vw * 4} color="#17C408" style={{margin: 10}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDown}>
                                <Icon name="minus" size={vw * 4} color="#C42B2D" style={{margin: 10}}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={onPress}>
                        <Image source={{uri: imageUrl}} style={styles.image}/>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.price}>{price} تومان </Text>
                    <Text style={{fontSize: vw * 4, fontFamily: 'B Yekan',}}>قیمت:</Text>
                </View>

                {(disscount) && <Text style={styles.discount}>{disscount}تومان </Text>}

            </View>

        </View>

    );

}

itemView.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    disscount: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    onUp: PropTypes.func.isRequired,
    onDown: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        borderRadius: 5 * vh,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        backgroundColor: '#e8f0e820',
        padding: 4 * vw,
        margin: 2 * vw,
        width: 70 * vw,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: vw,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        alignSelf: 'flex-end',
        fontSize: vw * 5,
        marginRight: 20,
        textAlign: 'center'

    },
    price: {fontSize: vw * 4, color: '#17c408', fontFamily: 'B Yekan', textAlign: 'left', marginRight: 10},
    discount: {
        textDecorationLine:
            'line-through',
        fontSize: vw * 4,
        color: '#d94c3d',
        fontFamily: 'B Yekan', textAlign: 'left', marginRight: 10

    },
    image: {
        alignSelf: 'flex-end',
        height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 4,
        borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    }
});

export default itemView;
