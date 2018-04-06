import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Button, Image, Dimensions, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {vw, vh, vmin, vmax} from '../viewport'

class alertBox extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row',flex: 8}}>
                    <Icon name="alert" size={vw * 6} color="#ff0000" style={{margin: 10}}/>
                    <View style={{flexDirection: 'column',flex: 8}}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.content}>{this.props.text}</Text>
                    </View>

                </View>
                <View style={{flex: 2}}>
                    <Button
                        large
                        color="red"
                        buttonStyle={{size: vw * 5,}}
                        title={'بستن'}
                        onPress={() => this.props.onClose()}
                    />
                </View>
            </View>
        );
    }


}


alertBox.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.35,
        backgroundColor: '#ffffff',

        padding: 16,
    },
    button1: {
        fontSize: vw * 5,
        fontFamily: 'B Yekan',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
        backgroundColor: '#ff3a00'

    },
    button: {
        fontFamily: 'B Yekan',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
        backgroundColor: '#c42822',
        fontSize: vw * 5,
    },
    title: {
        fontFamily: 'B Yekan',
        fontSize: vw * 5,
        fontWeight: '700',
    },

});


export default alertBox;
