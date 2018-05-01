import React, {Component} from 'react';
import {
    ImageBackground,
    BackHandler,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,

} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';
import Loading from '../components/loadScreen'
import Retry from '../components/reTry'
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import _ from 'lodash'
import fetch from "../fetch";

const Spinner = require('react-native-spinkit');
let context;

class ServerCheck extends React.Component {
    constructor(props) {
        super(props);
        // this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});
        this.state = {
            param: {api_code: props.api_code, user_number: props.user_number}
        };
        props.navigator.onNavigatorEvent((event) => {
            if (event.id === 'backPress') {
                BackHandler.exitApp();
            }
        });
        context = this;
        this.loginCheck({api_code: props.api_code, user_number: props.user_number});

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
                        passProps: {api_code: param.api_code, user_number: param.user_number},

                    });


                } else {
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
                server.retryParam();
            }).catch(error => {
                server.retryParam(context.loginCheck, context, param);
            }));


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