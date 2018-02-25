import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform, Image, Dimensions} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'
import ProgressiveImage from './progressiveImage'
import ProgressBar from "react-native-progress/Pie";

function ImageRow({title, onPress, imageUrl}) {


    return (
        <TouchableHighlight
            style={styles.row}
            onPress={onPress}
            underlayColor={'rgba(0, 0, 0, 0.0)'}
        >
            <View style={styles.row}>
                <Image source={{uri: imageUrl}}
                       indicator={ProgressBar}
                       style={styles.image}/>

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
        height: vh * 35,
        // paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    image: {
        height: vh * 35, width: 100 * vw,
        resizeMode: 'stretch'


    }
});


export default ImageRow;
