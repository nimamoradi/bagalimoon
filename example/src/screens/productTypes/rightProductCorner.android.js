import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {vw, vh, vmin, vmax} from '../../viewport'

function rightProductCorner({title, onPress, isSelected, index}) {
    return (


        <View>

            {(isSelected) ?
                <TouchableOpacity
                    underlayColor={'#ff7778'}
                    style={styles.row}
                    onPress={onPress}
                >
                    {(index % 2 === 0) ?
                        <ImageBackground
                            key={index}
                            resizeMode="stretch"
                            opacity={0.60}
                            style={styles.image}
                            source={require('../../../img/corner/corner_edge_up.png')}>
                            <Text   numberOfLines={2}
                                    style={styles.text}>{title}</Text>
                        </ImageBackground> :
                        <ImageBackground
                            key={index}
                            resizeMode="stretch"
                            opacity={0.60}
                            style={styles.image}
                            source={require('../../../img/corner/corner_edge_down.png')}>
                            <Text   numberOfLines={2}
                                    style={styles.text}>{title}</Text>
                        </ImageBackground>}
                </TouchableOpacity> :
                <TouchableOpacity
                    underlayColor={'rgba(0, 0, 0, 0.054)'}
                    style={styles.row}
                    onPress={onPress}
                >
                    {(index % 2 === 0) ?
                        <ImageBackground
                            key={index}
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../../../img/corner/corner_edge_up.png')}>
                            <Text
                                numberOfLines={2}
                                style={styles.text}>{title}</Text>
                        </ImageBackground> :
                        <ImageBackground
                            key={index}
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../../../img/corner/corner_edge_down.png')}>
                            <Text
                                numberOfLines={2}
                                style={styles.text}>{title}</Text>
                        </ImageBackground>}


                </TouchableOpacity>}
        </View>

    );
}

//tintColor: 'red'
rightProductCorner.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    index: PropTypes.number.isRequired,
    isSelected: PropTypes.bool
};

const styles = StyleSheet.create({
    image:{
        width: 25 * vw,
        height: 8 * vh,
        alignItems:'center',
        flex:1,
        justifyContent:'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
    },
    text: {
        width:22*vw,
        textAlign: 'center',
        fontSize: 4 * vw,
        color: 'white',
        fontFamily: 'B Yekan',
    },
    selText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 4 * vw,
        color: 'red',
        fontFamily: 'B Yekan',
    },
});

export default rightProductCorner;
