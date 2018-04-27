import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash'
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {vw, vh, vmin, vmax} from '../viewport'

function navBar({menu, basket, search ,basketSize}) {
    return (
        <View style={styles.container}>


            <TouchableOpacity onPress={_.debounce(() => basket(),
                1000, {leading: true, trailing: false})
            }>
                <Text style={{
                    position: 'absolute',
                    left: 5 * vw,
                    zIndex: 2,
                    width: 8 * vw, height: 8 * vw,
                    borderColor: '#ff0030',
                    borderWidth: vw,
                    borderRadius: 4 * vw,
                    textAlign: 'center',
                    fontSize: vw * 4,
                    fontFamily: 'B Yekan',
                    textAlignVertical: 'center',
                    backgroundColor: 'white', color: '#ff0030'
                }}>{basketSize}</Text>
                <Ionicons name="md-cart" size={vw * 8} color="white" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>


            <View style={{flex: 0.9}}/>
            <TouchableOpacity onPress={_.debounce(() => search(),
                1000, {leading: true, trailing: false})
            }>
                <MaterialIcons name="search" size={vw * 8} color="white" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={_.debounce(() => menu(),
                    1000, {leading: true, trailing: false})
                }>
                <Ionicons name="ios-menu" size={vw * 10} color="#ffffff" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ff0030',
        borderRadius: vw * 3,
        marginTop: vh,
        marginRight: vh,
        marginLeft: vh,
        borderBottomColor: 'rgba(0, 0, 0, 0.0)',
    }

});


navBar.propTypes = {
    menu: PropTypes.func.isRequired,
    basket: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
};
export default navBar;