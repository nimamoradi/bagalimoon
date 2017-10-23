import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Image, ScrollView, Text, TouchableOpacity, AsyncStorage, ListView,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import Loading from '../components/loadScreen'

let context;

class aboutus extends React.Component {


    render() {

        return (

            <View style={styles.container}>
                <Image
                    style={{
                        width: 50 * vw,
                        height: 25 * vh,

                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffffff10'
                    }}
                    source={require('../../img/grocery.png')}>
                </Image>
                <Text style={styles.text}>بقالی مون با هدف راحتی و سرعت در خریدهای روزانه طراحی شده</Text>
                <View style={{flex: 1}}/>


            </View>

        );

    }
}

aboutus.propTypes = {};

const styles = StyleSheet.create({
    subText: {
        padding: 2 * vw,
        fontSize: vw * 5,
        flex: 1,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    },
    text: {
        padding: 10 * vw,
        fontSize: vw * 6,
        flex: 1,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    }, container: {
        flex: 1,
        height: 100 * vh,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },

});

export default aboutus;
