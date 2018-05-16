import React, {Component} from 'react';
import {vw, vh,} from '../../viewport'

import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import server from '../../code'
import Loading from '../../components/loadScreen'
import fetch from '../../fetch'
import * as DeviceInfo from 'react-native-device-info';
import _ from 'lodash'

let context;

class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind();
        context = this;
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});
        if (props.semi_api_code !== null && props.semi_api_code !== undefined && props.semi_api_code.length > 0) {
            this.state = {
                sendData: false,
                phoneNumber: props.user_number,
                login: this.login.bind(this)
            };
            this.login({
                api_code: props.semi_api_code,
                phone_number: props.user_number
            });
        } else
            this.state = {
                sendData: false,
                phoneNumber: '09',
                login: this.login.bind(this)
            };

        // this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});

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
                server.alert('هشدار', 'فقط عدد وارد کنید', context);
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
                <ImageBackground
                    style={{
                        width: 100 * vw,
                        height: 100 * vh,
                    }}
                    source={require('../../../img/login.png')}>

                    <View style={styles.absolote}>
                        <View style={{height: 16 * vh}}>
                            <Text style={styles.text}>شماره همراه</Text>
                            <View style={{
                                flexDirection: 'row', flex: 1, margin: 4 * vh,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                <TextInput
                                    onSubmitEditing={() => {
                                        this.numberCheck(this.state.phoneNumber);
                                    }}
                                    onChange={(event) => this.onChanged(event.nativeEvent.text)}
                                    keyboardType='numeric' style={styles.textInput}
                                    value={this.state.phoneNumber}
                                />

                            </View>

                        </View>
                        <TouchableOpacity
                            onPress={_.debounce(() => this.numberCheck(this.state.phoneNumber),
                                1000, {leading: true, trailing: false})}
                        >
                            <Text style={{
                                textAlign: 'center', borderRadius: 20,
                                borderColor: '#bec4be',
                                borderWidth: 0.5,
                                backgroundColor: '#5bca45',
                                padding: 10,
                                marginTop: 15,
                                width: 32 * vw,
                                fontFamily: 'B Yekan',
                                fontSize: 20,
                                color: '#ffffff'
                            }}>ورود</Text>
                        </TouchableOpacity>
                        <Text style={{
                            fontFamily: 'B Yekan',
                            fontSize: 4 * vw,
                        }}> برای تکمیل ثبت نام یک کد برای شما ارسال می شود</Text>

                        {(this.state.sendData === true) ? <View style={styles.absolote}> <Loading/> </View> : null}
                    </View>
                </ImageBackground>);
    }

    numberCheck(number) {
        context.props.navigator.showLightBox({
            screen: 'example.alertWithButton',
            passProps: {
                title: 'توجه',
                text: 'آیا از صحت شماره وارد شده ' + number + ' اطمینان دارید؟',
                OptionOne: context.props.navigator.dismissLightBox,
                OptionTwo: context.doSignUp,
                textOne: 'ویرایش',
                textTwo: 'تایید'
            },
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                tapBackgroundToDismiss: true
            }
        })
    }

    doSignUp() {
        context.props.navigator.dismissLightBox();
        AsyncStorage.setItem('semi_api_code', '');
        context.setState({sendData: true});
        let pin = DeviceInfo.isPinOrFingerprintSet(isSet => {
            pin = (isSet)
        });
        (fetch(server.getServerAddress() + '/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'content-encoding': "gzip, deflate, br"
            },
            retries: 1,
            body: JSON.stringify({
                api_code: context.props.api_code,
                'phone_number': context.state.phoneNumber,
                'device_info': server.deviceInfo(context.state.phoneNumber)
            })
        }).then((response) => response.json().then((responseData) => {
            console.log('inside login response json');
            console.log('response object:', responseData);
            // alert(JSON.stringify(responseData));

            context.setState({sendData: false});
            if (responseData.hasOwnProperty('successful') && responseData.successful === true) {
                context.login({
                    api_code: responseData.api_code,
                    phone_number: context.state.phoneNumber
                });
                AsyncStorage.setItem('semi_api_code', responseData.api_code);
                AsyncStorage.setItem('user_number', context.state.phoneNumber);
            }
            else if (responseData.hasOwnProperty('phone_number_error') && responseData.phone_number_error === true) {
                server.alert('هشدار', 'شماره معتبر نمی باشد', context);
            } else if (responseData.hasOwnProperty('successful') && responseData.successful === false) {
                server.alert('هشدار', 'درخواست های زیاد با این شماره لطفا بعدا امتحان کنید', context);
            } else
                server.alert('هشدار', 'اشکالی پیش آماده بعد امتحان کنید', context);


        }))
            .catch(ignored => {
                server.retryParam(context.doSignUp, context);
            }).catch(ignored => {
                server.retryParam(context.doSignUp, context);
            })).catch(ignored => {
            server.retryParam(context.doSignUp, context);
        });
        // console.log('inside login form');

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
        fontSize: 5 * vw,
        marginBottom: 10,
        marginLeft: 10,
    },

    textInput: {
        fontFamily: 'B Yekan',
        borderRadius: 2 * vw,
        height: 8 * vh,
        borderColor: '#bec4be',
        borderWidth: 1,
        alignSelf: 'center',
        width: '80%',

    },
    flex: {
        flex: 1,
    },
    absolote: {
        marginTop: 10 * vh,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default loginScreen;
