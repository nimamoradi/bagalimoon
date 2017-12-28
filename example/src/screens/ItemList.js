import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class offer extends Component {


    render() {
        return (
       <Text>{this.props.title}</Text>

        );
    }


}

offer.PropTypes = {
    title: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({

});

export default offer;
