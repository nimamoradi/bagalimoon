import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,
    AsyncStorage


} from 'react-native';
import server from '../code'
import Loading from '../components/loadScreen'

let context;

class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind();
        this.state = {
            sendData: false,
            phoneNumber: '09',
            login: this.login.bind(this)
        };
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});
        context = this;
    }

    onChanged = (text) => {
        let newText = '';
        let numbers = '0123456789';

        for (let i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                newText = '09';
                server.alert('هشدار', "فقط عدد وارد کنید", context);
                break;
            }

        }
        this.setState({phoneNumber: newText});
    };

    render() {
        if (this.state.sendData) return <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Loading/>
        </View>;
        else
            return (
                <Image
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        backgroundColor: '#ffffff10'
                    }}
                    source={require('../../img/login.png')}>

                    <View style={styles.absolote}>
                        <View style={{width: Dimensions.get('window').width - 100}}>
                            <Text style={styles.text}>شماره همراه</Text>
                            <TextInput
                                onChange={(event) => this.onChanged(event.nativeEvent.text)}
                                keyboardType='numeric' style={styles.textInput}>
                                {this.state.phoneNumber}
                            </TextInput>

                            <TouchableOpacity
                                onPress={this.isAvailable}
                            >
                                <Text style={{
                                    textAlign: 'center', borderRadius: 20,
                                    borderColor: '#bec4be',
                                    borderWidth: 0.5,
                                    backgroundColor: '#5bca45',
                                    padding: 10,
                                    margin: 40,
                                    fontFamily: 'B Yekan',
                                    fontSize: 20,
                                    color: '#ffffff'
                                }}>ورود</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.absolote}>
                        {(this.state.sendData === true) ? <Loading/> : null}
                    </View>
                </Image>        );
    }

    doSignUp() {

        console.log("inside post register");
        fetch(server.getServerAddress() + '/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                phone_number: context.state.phoneNumber,
            })
        }).then((response) => response.json())
            .then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData);
                context.setState({sendData: false});
                if (responseData.successful === true) {
                    context.login({api_code: responseData.api_code});
                    AsyncStorage.setItem('user_number', context.state.phoneNumber);
                } else if (responseData.successful === false) {
                    server.alert('هشدار', 'درخواست های زیاد با این شماره لطفا بعدا امتحان کنید', context);
                }
                else if (responseData.phone_number !== null) {
                    server.alert('هشدار', 'شماره معتبر نمی باشد', context);
                }

            }).catch(error => {
            server.retry(context.isAvailable, context)
        });
    }


    login(props) {

        context.props.navigator.push({
            screen: 'example.Types.codeEnter',
            navigatorStyle: {
                navBarBackgroundColor: 'transparent', // the background is white
                drawUnderNavBar: true,
                drawUnderTabBar: true,
                navBarTranslucent: false
            },
            passProps: props,
        });
    };

    isAvailable = () => {
        context.setState({sendData: true});
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, server.getTimeOut(), 'Request timed out');
        });

        const request = fetch(server.getServerAddress());

        return Promise
            .race([timeout, request])
            .then(response => {
                context.doSignUp();

            })
            .catch(error => {
                server.retry(context.isAvailable, context)
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
        fontFamily: 'B Yekan',
        margin: 50,
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 10,
    },
    textInput: {
        fontFamily: 'B Yekan',
        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        alignSelf: 'center',
        width: '80%',

    },
    flex: {
        flex: 1,
    }, absolote: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default loginScreen;
