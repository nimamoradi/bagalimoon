import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform, Image, Dimensions} from 'react-native';
let wid = Dimensions.get('window').width /2.5;
function item({title, onPress,imageUrl,price}) {


    return (
        <View style={{ backgroundColor:'#eeeceb'}}>
            <TouchableHighlight
                onPress={onPress}
                underlayColor={'rgba(0, 0, 0, 0.054)'}>
                <View style={styles.row}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>


                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

item.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    row: {
        height: wid+20,
        paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: 16,

    },
    price:{   fontSize: 16,color:'#17c408'},
    image: {flex: 1, resizeMode: 'stretch', width: wid-15, height: wid-15}
});

export default item;
