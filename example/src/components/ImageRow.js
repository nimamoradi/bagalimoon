import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform,Image,Dimensions} from 'react-native';

function ImageRow({title, onPress, platform, testID,imageUrl}) {
    if (platform && platform !== Platform.OS) {
        return <View />;
    }

    return (
        <TouchableHighlight
            onPress={onPress}
            testID={testID}
            underlayColor={'rgba(0, 0, 0, 0.054)'}
        >
            <View style={styles.row}>
                <Image  source={{uri: imageUrl}} style={styles.image}/>


                    <Text style={styles.text}>{title}</Text>
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
        height: 150,
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
    image:{flex:1,resizeMode:'stretch',width:400}
});


export default ImageRow;
