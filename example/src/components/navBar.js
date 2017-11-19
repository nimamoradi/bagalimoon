import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import {vw, vh, vmin, vmax} from '../viewport'
function navBar({menu,basket}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={basket}>
                <IconAwesome name="shopping-basket" size={vw * 6} color="#00aa00" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <IconAwesome name="search" size={vw * 6}  style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>
            <Text style={{flex:6,textAlign:'center',fontSize:6*vw,fontFamily:'B Yekan'}}>بقالی مون

            </Text>
            <View style={{flex:1}}/>
            <TouchableOpacity onPress={menu}>
            <Icon name="menu" size={vw * 8} color="#000000" style={{margin: 10,flex:1}}/>
            </TouchableOpacity>

        </View>
    )

}

const styles = StyleSheet.create({
container:{
    flexDirection:'row',
}

});


navBar.propTypes = {
    menu: PropTypes.func.isRequired,
    basket: PropTypes.func.isRequired,
};
export default navBar;