import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image} from 'react-native';


function offer({title}) {
      return (

        <View style={styles.row}>
            <Text style={styles.text}>{title}</Text>
            {/*<Image source={{uri: imageUrl}} style={styles.image}>*/}

            {/*</Image>*/}

        </View>

    );
}

offer.propTypes = {
    title: PropTypes.string.isRequired,
    // imageUrl: PropTypes.string.isRequired,
    // des: PropTypes.string.isRequired,
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
    image: {
        width: 150,
        height: 150
    }
});
export default offer;
