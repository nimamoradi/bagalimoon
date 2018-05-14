import React, {Component} from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    ImageBackground,
    AsyncStorage

} from 'react-native';
import {vw, vh, vmin, vmax} from '../../viewport'
import Loading from '../../components/loadScreen'
import fetch from '../../fetch'

let context;
import server from '../../code'


class codeEnter extends React.Component {
    constructor(props) {
        super(props);
        props.navigator.setDrawerEnabled({side: 'right', enabled: false});

        this.state = {
            code: '',
            sendData: false,
        };


        context = this;
    }



    render() {
        return (
            <ImageBackground
            style={{
                width: '100%',
                height:'100%',
            }}
                    source={require('../../../img/login.png')}>

                    <View style={styles.absolote}>
                        <View style={{height: 16 * vh}}>
                        <Text style={styles.text}>کد دریافتی</Text>
                        <View style={{
                                flexDirection: 'row', flex: 1, margin: 4 * vh,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                        <TextInput
                            onSubmitEditing={this.enterCode}
                            onChange={(event) => context.setState({code: event.nativeEvent.text})}
                            keyboardType='numeric' style={styles.textInput}
                            value={this.state.code}/>
                        </View>

                    </View>
                    <TouchableOpacity
                        onPress={this.enterCode}
                    >
                      <Text style={{
                                textAlign: 'center', borderRadius: 20,
                                borderColor: '#bec4be',
                                borderWidth: 0.5,
                                backgroundColor: '#5bca45',
                                padding: 10,
                                marginTop: 15,
                                borderRadius:4*vw,
                                width: 32 * vw,
                                fontFamily: 'B Yekan',
                                fontSize: 20,
                                color: '#ffffff'
                        }}>تایید</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row',}}>

                        <TouchableOpacity
                            onPress={this.doSignUp}
                        >
                            <Text style={{
                                fontFamily: 'B Yekan',
                                fontSize: vw * 5,
                                borderRadius:4*vw,
                                color: '#65a4ff'
                            }}>ارسال مجدد</Text>
                        </TouchableOpacity>
                        <Text style={{

                            fontFamily: 'B Yekan',
                            fontSize: vw * 5,
                            color: 'black'
                        }}>پیامک دریافت نشد : </Text>
                    </View>
                </View>
                {(this.state.sendData === true) ? <View style={styles.absolote}> <Loading/> </View> : null}
            </ImageBackground>
        );
    }


    doSignUp() {
        context.setState({sendData: true});

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
            context.setState({sendData: false});

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


    enterCode = () => {

        context.setState({sendData: true});
        console.log("inside post smsVerify");
        fetch(server.getServerAddress() + '/api/smsVerify', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_code: context.props.api_code,
                sms_code: context.state.code,
                phone_number: context.props.phone_number
            })
        }).then((response) => response.json())
            .then((responseData) => {

                if (responseData.hasOwnProperty('successful') && responseData.successful === true) {
                    AsyncStorage.setItem('api_code', responseData.api_code);
                    this.pushMainScreen(responseData.api_code, responseData.minimum_cart_price);
                } else if (responseData.hasOwnProperty('successful') && responseData.successful === false) {
                    context.setState({sendData: false});
                    server.alert('هشدار', 'کد اشتباه است', context);
                }
                else if (responseData.sms_code !== null) {
                    context.setState({sendData: false});
                    server.alert('هشدار', 'شماره کد را وارد کنید', context);
                }


            }).catch(error => {
            server.retryParam(context.isAvailable, context)
        }).catch(error => {
            server.retryParam(context.isAvailable, context)
        });
    };

    pushMainScreen(api, minimum_cart_price) {

        context.props.navigator.resetTo({
            backButtonTitle: '',
            screen: 'example.Types',
            title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {
                navBarTranslucent: false,
                navBarHidden: true,
            }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            backButtonHidden: true,
            drawer: { // optional, add this if you want a side menu drawer in your app
                right: { // optional, define if you want a drawer from the right
                    screen: 'example.Types.Drawer', // unique ID registered with Navigation.registerScreen
                    passProps: {api_code: api,}, // simple serializable object that will pass as props to all top screens (optional)
                    fixedWidth:75*vw
                },
                style: { // ( iOS only )
                    drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                    contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
                    leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
                    rightDrawerWidth: 50 // optional, add this if you want a define right drawer width (50=percent)
                },
                type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
                animationType: 'parallax', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
                disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
            },
            overrideBackPress: false,
            passProps: {api_code: api, user_number: context.state.phoneNumber, minimum_cart_price:minimum_cart_price},

        });
    }

}


codeEnter.propTypes = {};
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
            fontSize: 4 * vw,
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
export default codeEnter;
