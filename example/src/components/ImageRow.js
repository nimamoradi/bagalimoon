import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform, Image, Dimensions} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'

function ImageRow({title, onPress, imageUrl}) {


    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={'rgba(0, 0, 0, 0.0)'}
        >
            <View style={styles.row}>
                <Image source={{uri: imageUrl}}
                       resizeMethod='scale'
                       resizeMode='stretch'
                       style={styles.image} />
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
        height:vh*35,
        // paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
     image: {
        flex: 1, width: Dimensions.get('window').width, height:vh*40,


    }
});


export default ImageRow;
