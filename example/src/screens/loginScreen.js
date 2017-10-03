import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput


} from 'react-native';


class loginScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.rowMain}>

                <View style={styles.subRow}/>
                <View style={styles.subRow}>
                    <Text style={styles.text}>شماره همراه</Text>
                    <TextInput  keyboardType='numeric'  style={styles.textInput}/>
               </View>


                <View style={styles.subRow}/>
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                    <TouchableOpacity
                    onPress={this.login}
                    >
                        <Text style={{
                            textAlign: 'center', borderRadius: 20,
                            borderColor: '#bec4be',
                            borderWidth: 0.5,
                            backgroundColor: '#5bca45',
                            padding:10,
                            margin:40,
                            fontSize:20,
                            color:'#ffffff'
                        }}>ارسال</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    login = () => {
        this.props.navigator.pop();
        this.props.navigator.push({
            screen: 'example.Types.codeEnter',
            title: 'وارد کردن رمز', // title of the screen as appears in the nav bar (optional)
            passProps: {},


        });
    };


}


loginScreen.propTypes = {};

const styles = StyleSheet.create({

    rowMain: {},
    subRow: {
        flex: 1,
        margin: 50,

        flexDirection: 'column',
        alignItems: 'flex-end'

    },
    text: {

        marginBottom: 10,
        marginLeft: 10,
    },
    textInput: {
        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,

        width: '100%',

    },
    flex: {
        flex: 1,
    }
});

export default loginScreen;
