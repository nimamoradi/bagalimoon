import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'

function TypeButton({title, onPress, isSelected}) {
    return (


        <View>

            {(isSelected) ?
                <ImageBackground
                    key={title}
                    opacity={0.6}
                    resizeMode="stretch"
                    style={styles.imageStyle}

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
                    key={title}
                    resizeMode="stretch"
                    style={styles.imageStyle}
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
    imageStyle: {
        height: 10 * vh, width: 28 * vw, flex: 1,
        justifyContent: 'center',
        marginLeft: -15,
        alignItems: 'center'
    },
    text: {
        textAlign:'center',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 4 * vw,
        color: 'white',
        textAlignVertical: 'center',
        fontFamily: 'B Yekan',
        width: 17 * vw,
    },
    selText: {

        width: 17 * vw,
        flex: 1,
        textAlign: 'center',
        fontSize: 4 * vw,
        color: 'red',
        fontFamily: 'B Yekan',
    },
});

export default TypeButton;
