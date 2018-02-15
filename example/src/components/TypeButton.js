import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ImageBackground, TouchableHighlight} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'

function TypeButton({title, onPress, isSelected}) {
    return (


        <View>

            {(isSelected) ?
                <TouchableHighlight
                    underlayColor={'rgba(0, 0, 0, 0.054)'}
                    style={{
                        paddingHorizontal: 5 * vw,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        margin: 5,
                        height: 9 * vh,
                        borderRadius: 15,
                        borderColor: '#297626',
                        backgroundColor: '#ff7778',
                        borderWidth: 0.5,
                        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
                    }}
                    onPress={onPress}
                >
                    <Text style={styles.text}>{title}</Text>
                </TouchableHighlight> :
                <TouchableHighlight
                    onPress={onPress}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ImageBackground
                        resizeMode="stretch"
                        style={{height: 8 * vh, marginLeft: -15}}
                        source={require('../../img/corner/flatListItem.png')}>

                        <Text numberOfLines={2}
                              style={styles.text}>{title}</Text>

                    </ImageBackground>
                </TouchableHighlight>
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

        marginLeft: 9 * vw,
        alignItems: 'center',
        justifyContent: 'center',
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

export default TypeButton;
