import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View, Text, color} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {vw, vh, vmin, vmax} from '../../viewport'


function drawerItem(title, onPress, icon) {


    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: 'red',
                width: 300,
                height: 10 * vh,
                alignSelf: 'flex-end',
                alignContent: 'center',
            }}>
                <Icon name={icon} size={vw * 8} color="blue"
                      style={{margin: 10, flex: 1, alignSelf: 'flex-start'}}/>
                <Text numberOfLines={1} style={styles.textFont}>{'خروج از حساب'}</Text>
            </View>
        </TouchableOpacity>

    );
}


const styles = StyleSheet.create({
    textFont: {
        fontFamily: 'B Yekan',
        fontSize: vw * 6,
        backgroundColor: 'green',
        flex: 4,
        textAlign: 'center',

    }
});

export default drawerItem;
