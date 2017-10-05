import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image,
    Dimensions


} from 'react-native';


class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: ''
        };
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <Image source={require('../../img/masonry/AdGXmD1CH6.jpeg')}
                           style={{
                               width:Dimensions.get('window').width,height:Dimensions.get('window').height/2.1,marginBottom:10}}/>
                </View>

                <View style={{flex: 1.3}}>
                    <Text style={styles.text}>
                        برای ورود شماره همراه خود را وارد کنید شماره فعال سازی برای شما پیامک می شود
                    </Text>

                    <Text style={styles.text}>شماره همراه</Text>
                    <TextInput
                        onTextChange={(text) => setState({phoneNumber: text})}
                        keyboardType='numeric' style={styles.textInput}>
                        {this.state.phoneNumber}
                    </TextInput>

                    <TouchableOpacity
                        onPress={this.login}
                    >
                        <Text style={{
                            textAlign: 'center', borderRadius: 20,
                            borderColor: '#bec4be',
                            borderWidth: 0.5,
                            backgroundColor: '#5bca45',
                            padding: 10,
                            margin: 40,
                            fontSize: 20,
                            color: '#ffffff'
                        }}>ارسال</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    doSignUp() {

        console.log("inside post api");
        fetch('your API URL', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },


            body: JSON.stringify({
                phoneNumber: this.state.phoneNumber,
                hashCode: 'hi'

            })
        }).then((response) => response.json())
            .then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData)

            }).done();
    }

    test() {

        console.log("get test");
        fetch('https://facebook.github.io/react-native/movies.json', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },


        }).then((response) => response.json())
            .then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData)

            });
    }

    login = () => {

        this.props.navigator.push({
            screen: 'example.Types.codeEnter',
            title: 'وارد کردن رمز', // title of the screen as appears in the nav bar (optional)
            passProps: {},


        });
    };


}


loginScreen.propTypes = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeeceb'
    },
    rowMain: {},
    subRow: {
        flex: 1,
        margin: 50,

        flexDirection: 'column',
        alignItems: 'flex-end'

    },
    text: {
        margin: 50,
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
