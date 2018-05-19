import React, {Component} from 'react';
import {
    ImageBackground,
    BackHandler,
    Platform,
    StyleSheet,
    AsyncStorage

} from 'react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules


import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";

import fetch from "../fetch";
import HockeyApp from 'react-native-hockeyapp'


const Spinner = require('react-native-spinkit');
let context;

class ServerCheck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            param: {api_code: props.api_code, user_number: props.user_number}
        };
        props.navigator.onNavigatorEvent((event) => {
            if (event.id === 'backPress') {
                BackHandler.exitApp();
            }
        });
        context = this;

    }

    loginCheck(param) {

        (fetch(server.getServerAddress() + '/api/UserDetails', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'phone_number': param.user_number,
                "device_info": server.deviceInfo(param.user_number),
                'api_code': param.api_code,
            })
        }).then((response) => response.json())
            .then((responseData) => {
                console.log(JSON.stringify(responseData));

                if (!responseData.hasOwnProperty("error")) {
                    console.log('example.Types');

                    context.props.navigator.resetTo({
                        backButtonTitle: '',
                        screen: 'example.Types',
                        title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
                        navigatorStyle: {
                            navBarTranslucent: false,
                            navBarHidden: true,
                        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                        backButtonHidden: true,
                        overrideBackPress: false,
                        passProps: {
                            api_code: param.api_code, user_number: param.user_number,
                            minimum_cart_price: responseData.minimum_cart_price
                        },

                    });


                } else {
                    AsyncStorage.clear();
                    context.props.navigator.push({
                        backButtonTitle: '',
                        screen: 'example.Types.loginScreen',
                        navigatorStyle: {
                            navBarTranslucent: false,
                            navBarHidden: true,
                        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                        backButtonHidden: true,
                        overrideBackPress: true,
                        passProps: {api_code: param.api_code,},

                    });

                }
            }).catch(error => {
                server.retryParam(context.loginCheck, context, param);
            }).catch(error => {
                server.retryParam(context.loginCheck, context, param);
            }));


    }

    componentWillMount() {
        // OneSignal.init("YOUR_ONESIGNAL_APPID");
        OneSignal.init("12637e49-1ef9-44d3-b902-de1f14e4cd5c");
        OneSignal.sendTag("phone_number", this.props.user_number);

        this.loginCheck({api_code: this.props.api_code, user_number: this.props.user_number});
        HockeyApp.configure('d1de9e5fa7984b029c084fa1ff56672e', true);
    }

    componentDidMount() {
        HockeyApp.start();
        if (Platform.OS === 'android')
            HockeyApp.checkForUpdate(); // optional
        // Sending single tag
    }

    render() {

        return <ImageBackground style={{
            width: 100 * vw, height: 100 * vh, justifyContent: 'center', flex: 1,
            alignItems: 'center'
        }} source={require('../../img/login.png')}>
            <Spinner
                size={100}
                color={'red'}
                type={'WanderingCubes'}
            />
        </ImageBackground>;


    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee70',
        borderRadius: 5,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    spinner: {
        width: 10 * vw,
        height: 10 * vw,

    },
    text: {
        fontSize: 5 * vw,
        fontFamily: 'B Yekan',
        margin: 5 * vw,
    }
});
export default ServerCheck;