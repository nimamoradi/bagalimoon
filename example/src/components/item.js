import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';

function item({title, onPress, imageUrl, price, disscount}) {
    if (disscount == null) {
        return (
            <View style={styles.row}>
                <Image source={{uri: imageUrl}} style={styles.image}/>
                <Text style={styles.text}>{title}</Text>
                <View style={styles.priceView}>
                    <Text style={styles.price}>{price}</Text>


                </View>
            </View>
        );
    } else {

        return (
            <View style={styles.row}>
                <Image source={{uri: imageUrl}} style={styles.image}/>
                <Text style={styles.text}>{title}</Text>
                <View style={styles.priceView}>
                    <Text style={styles.price}>{price}</Text>

                    <Text style={styles.discount}>{disscount}</Text>
                </View>
            </View>
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
        flex: 1,
        paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        width: '100%',
        fontSize: 16,

    },
    price: {flex: 1, fontSize: 16, color: '#17c408', textAlign: 'left'},
    discount: {flex: 1, textDecorationLine: 'line-through', fontSize: 16, color: '#d94c3d', textAlign: 'right'},
    image: { height: '60%', minWidth:100, borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,}
});

export default item;
