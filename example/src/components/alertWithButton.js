import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Button, Image, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {vw, vh, vmin, vmax} from '../viewport'

class alertWithButton extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', flex: 8}}>
                    <Icon name="info" size={vw * 6} color="green" style={{margin: 10}}/>
                    <View style={{flexDirection: 'column', flex: 8}}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.content}>{this.props.text}</Text>
                    </View>

                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 2, margin: 2 * vw}}>
                        <Button
                            large
                            color="red"
                            buttonStyle={{size: vw * 5,}}
                            title={this.props.textOne}
                            onPress={() => this.props.OptionOne()}
                        />
                    </View>
                    <View style={{flex: 2, margin: 2 * vw}}>
                        <Button
                            large
                            color="red"
                            buttonStyle={{size: vw * 5,}}
                            title={this.props.textTwo}
                            onPress={() => this.props.OptionTwo()}
                        />
                    </View>
                </View>
            </View>
        );
    }


}


alertWithButton.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    OptionOne: PropTypes.func.isRequired,
    OptionTwo: PropTypes.func.isRequired,
    textOne: PropTypes.string.isRequired,
    textTwo: PropTypes.string.isRequired,


};
const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderRadius: 10,
        width: 75 * vw,
        height: vh * 35,
        backgroundColor: '#f2f2f2',

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
        fontSize: vw * 6,
        fontWeight: '700',
    },
    content: {
        fontFamily: 'B Yekan',
        fontSize: vw * 4,
        fontWeight: '700',
        textAlign: 'center'
    }

});


export default alertWithButton;
