import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import _ from 'lodash'
import {vw, vh, vmin, vmax} from '../viewport'

function productPageNavBar({context, basket, search, basketSize}) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => context.props.navigator.pop({
                    animated: true,
                    animationType: 'fade',
                })}>
                <Ionicons name="ios-arrow-back" size={vw * 8} color="white" style={{margin: 10,}}/>
            </TouchableOpacity>


            <View style={{flex: 1}}/>
            <Text style={styles.text}>لیست محصولات</Text>
            <TouchableOpacity onPress={_.debounce(() => search(),
                1000, {leading: true, trailing: false})
            }>
                <MaterialIcons name="search" size={vw * 8} color="white" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 2 * vw}} onPress={_.debounce(() => basket(),
                1000, {leading: true, trailing: false})
            }>
                {basketSize !== 0 ? <Text style={{
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
                }}>{basketSize}</Text> : null}
                <Ionicons name="md-cart" size={vw * 8} color="white" style={{margin: 10, flex: 1}}/>
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
        borderBottomColor: '#f2f2f2',
    },
    text: {
        fontSize: vw * 6,
        padding: 2 * vw,
        color: 'white',
        fontFamily: 'B Yekan',
    },

});


productPageNavBar.propTypes = {
    basket: PropTypes.func.isRequired,
    context: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    // sortAs:PropTypes.func.isRequired,
    // sortDe:PropTypes.func.isRequired,
};
export default productPageNavBar;