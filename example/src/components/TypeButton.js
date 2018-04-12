import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'

function TypeButton({title, onPress, isSelected}) {
    return (


        <View>

            {(isSelected) ?
                <ImageBackground
                    opacity={0.6}
                    resizeMode="stretch"
                    style={{
                        height: 10 * vh, marginLeft: -15, width: 30 * vw, flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}

                    source={require('../../img/corner/flatListItem.png')}>
                    <TouchableOpacity
                        onPress={onPress}
                    >
                        <Text
                            numberOfLines={2}
                            style={styles.text}>{title}</Text>
                    </TouchableOpacity>
                </ImageBackground> :

                <ImageBackground

                    resizeMode="stretch"
                    style={{height: 10 * vh, marginLeft: -15, width: 30 * vw}}
                    source={require('../../img/corner/flatListItem.png')}>
                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text numberOfLines={2}
                              style={styles.text}>{title}</Text>
                    </TouchableOpacity>
                </ImageBackground>

            }
        </View>

    );
}

TypeButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool
};

const styles = StyleSheet.create({

    text: {

        marginRight: 5 * vw,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 4 * vw,
        color: 'white',
        fontFamily: 'B Yekan',
        width: 20 * vw,
    },
    selText: {
        marginRight: 5 * vw,
        width: 20 * vw,
        flex: 1,
        textAlign: 'center',
        fontSize: 4 * vw,
        color: 'red',
        fontFamily: 'B Yekan',
    },
});

export default TypeButton;
