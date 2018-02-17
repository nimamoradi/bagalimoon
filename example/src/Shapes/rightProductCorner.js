import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'

function rightProductCorner({title, onPress, isSelected, index}) {
    return (


        <View>

            {(isSelected) ?
                <TouchableOpacity
                    underlayColor={'#ff7778'}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                    }}
                    onPress={onPress}
                >
                    {(index % 2 === 0) ?
                        <ImageBackground
                            resizeMode="stretch"
                            opacity={0.60}
                            style={styles.image}
                            source={require('../../img/corner/corner_edge_up.png')}>
                            <Text style={styles.text}>{title}</Text>
                        </ImageBackground> :
                        <ImageBackground
                            resizeMode="stretch"
                            opacity={0.60}
                            style={styles.image}
                            source={require('../../img/corner/corner_edge_down.png')}>
                            <Text style={styles.text}>{title}</Text>
                        </ImageBackground>}
                </TouchableOpacity> :
                <TouchableOpacity
                    underlayColor={'rgba(0, 0, 0, 0.054)'}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                    }}
                    onPress={onPress}
                >
                    {(index % 2 === 0) ?
                        <ImageBackground
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../../img/corner/corner_edge_up.png')}>
                            <Text style={styles.text}>{title}</Text>
                        </ImageBackground> :
                        <ImageBackground
                            resizeMode="stretch"
                            style={styles.image}
                            source={require('../../img/corner/corner_edge_down.png')}>
                            <Text style={styles.text}>{title}</Text>
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
        alignContent:'center'
    },
    row: {
        fontSize: vw * 3,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        margin: 15,
        borderRadius: 15,
        borderColor: '#ff1d1e',
        borderWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        flex: 1,
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
