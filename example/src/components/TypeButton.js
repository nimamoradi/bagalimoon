import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'

function TypeButton({title, onPress, isSelected}) {
    return (


        <View>

            {(isSelected) ?
                <TouchableOpacity
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
                        backgroundColor: '#10620f',
                        borderWidth: 0.5,
                        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
                    }}
                    onPress={onPress}
                >
                    <Text style={styles.text}>{title}</Text>
                </TouchableOpacity> :
                <TouchableOpacity
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
                        borderColor: '#349630',
                        backgroundColor: '#3bad37',
                        borderWidth: 0.5,
                        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
                    }}
                    onPress={onPress}
                >
                    <Text style={styles.text}>{title}</Text>
                </TouchableOpacity>}
        </View>

    );
}

TypeButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool
};

const styles = StyleSheet.create({
    row: {
        fontSize: vw * 3,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        margin: 15,
        borderRadius: 15,
        borderColor: '#3db139',
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

export default TypeButton;
