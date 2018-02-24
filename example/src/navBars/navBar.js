import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {vw, vh, vmin, vmax} from '../viewport'
function navBar({menu,basket,search}) {
    return (
        <View style={styles.container}>


            <TouchableOpacity onPress={basket}>
                <Icon name="shopping-basket" size={vw * 8} color="white" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={search}>
                <MaterialIcons name="search" size={vw * 8} color="white" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>


            <View style={{flex:0.9}}/>
            <TouchableOpacity onPress={()=>menu()}>
            <Ionicons name="ios-menu" size={vw * 10} color="#ffffff" style={{margin: 10, flex: 1}}/>
            </TouchableOpacity>

        </View>
    )

}

const styles = StyleSheet.create({
container:{
    flexDirection:'row',
    backgroundColor:'#ff0030',
    borderRadius: vw* 3,
    marginTop:vh,
    marginRight:vh,
    marginLeft:vh,
    borderBottomColor: 'rgba(0, 0, 0, 0.0)',
}

});


navBar.propTypes = {
    menu: PropTypes.func.isRequired,
    basket: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
};
export default navBar;