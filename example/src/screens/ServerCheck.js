import React, {Component} from 'react';
import {
    ActivityIndicator,
    Image,
    BackHandler,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Loading from '../components/loadScreen'
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import _ from 'lodash'
import fetch from "../fetch";

class ServerCheck extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});
        this.state = {
            dataReady: false,
            isFirstTime: true,
            param: {api_code: props.api_code, user_number: props.user_number}
        };
        props.navigator.onNavigatorEvent((event) => {
            if (event.id === 'backPress') {
                BackHandler.exitApp();
            }
        });
        this.loginCheck({api_code: props.api_code, user_number: props.user_number});

    }

    loginCheck(param) {
        this.setState({dataReady: false});
        fetch(server.getServerAddress() + '/api/UserDetails', {
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
                    this.props.navigator.push({
                        backButtonTitle: '',
                        screen: 'example.Types',
                        title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
                        navigatorStyle: {
                            navBarTranslucent: false,
                            navBarHidden: true,
                        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                        backButtonHidden: true,
                        overrideBackPress: true,
                        passProps: {api_code: param.api_code,},

                    });
                    this.props.navigator.pop();
                } else {
                    this.props.navigator.push({
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
                    this.props.navigator.push({
                        screen: 'example.Types.loginScreen',
                        navigatorStyle: {
                            navBarHidden: true,
                        },
                        title: '',
                        passProps: passProps,
                    });
                    this.props.navigator.pop();
                }
            }).catch(error => {
            this.setState({dataReady: true, isFirstTime: false,})
        })

    }

    render() {

        if (this.state.isFirstTime) {
            return <Image style={{width: 100 * vw, height: 100 * vh}} source={require('../../img/login.png')}/>
        } else if (!this.state.dataReady) return <View style={{
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
            return <View style={styles.container}>

                <Text style={styles.text}>اتصال قطع شد</Text>
                <TouchableOpacity
                    onPress={_.debounce(
                        () => {
                            this.loginCheck(this.state.param);
                        },
                        1000, {leading: true, trailing: false}
                    )}
                >
                    <Icon name="redo" size={vw * 20} color="#777777" style={{margin: 2 * vw}}/>
                </TouchableOpacity>
                <Text style={styles.text}>دوباره امتحان کنید</Text>
            </View>

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
    activityIndicator: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#99999910'
    },
    text: {
        fontSize: 5 * vw,
        fontFamily: 'B Yekan',
        margin: 5 * vw,
    }
});
export default ServerCheck;