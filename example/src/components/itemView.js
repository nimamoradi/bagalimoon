import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function itemView({title, onPress, imageUrl, price, disscount}) {


    return (
        <View style={{}}>
            <View style={styles.row}>
                <Image source={{uri: imageUrl}} style={styles.image}/>
                <Text style={styles.text}>{title}</Text>
                <View style={styles.priceView}>
                    <View style={{flexDirection: 'row', alignContent: 'center'}}>
                        <Text style={styles.price}>{price}</Text>
                        <Text style={{fontSize: 16,}}>قیمت:</Text>
                    </View>
                    <Text style={styles.discount}>{disscount}</Text>

                </View>
            </View>
        </View>
    );

}

itemView.propTypes = {
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
        borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        backgroundColor: '#e8f0e820',
        padding: 20,
        margin:10,
        width: Dimensions.get('window').width*0.95,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        alignSelf: 'flex-end',
        fontSize: 16,
        marginRight: 20,
        textAlign: 'center'

    },
    price: {fontSize: 16, color: '#17c408', textAlign: 'left', marginRight: 10},
    discount: {flex: 1, textDecorationLine: 'line-through', fontSize: 16, color: '#d94c3d', textAlign: 'right'},
    image: {
        alignSelf: 'flex-end',
        height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 4,
        borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    }
});

export default itemView;
