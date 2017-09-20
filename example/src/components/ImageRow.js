import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform, Image, Dimensions} from 'react-native';

function ImageRow({title, onPress, imageUrl}) {


    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={'rgba(0, 0, 0, 0.054)'}
        >
            <View  style={{flex:1,flexDirection:'column'}}>
                <Image source={{uri: imageUrl}} style={styles.image}   />
                <Text style={styles.text}>hi</Text>
            </View>
        </TouchableHighlight>
    );
}

ImageRow.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        // paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {

        textAlign: 'center',
        fontSize: 16,

    },
    image:{   flex: 1,alignSelf: 'stretch',  height: 380,width:380,resizeMode:'stretch'}
});


export default ImageRow;
