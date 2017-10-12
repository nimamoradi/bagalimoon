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
import Loading from '../components/loadScreen'

let context;
import server from '../code'

let data;
let Categories;
let isDataReady = 0;

class codeEnter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            sendData: false,
        };

        context = this;
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    {(this.state.sendData == true) ? <Loading/>:null}
                </View>
                <View style={{flex: 1}}>
                    <Image source={require('../../img/trademark.png')}
                           style={{
                               flex: 1,
                               resizeMode: 'stretch',
                               width: Dimensions.get('window').width,
                               height: Dimensions.get('window').height / 2.1,
                               marginBottom: 10
                           }}/>
                </View>

                <View style={{flex: 1.3}}>


                    <Text style={styles.text}>کد دریافتی</Text>
                    <TextInput
                        onChange={(event) => this.setState({code: event.nativeEvent.text})}
                        keyboardType='numeric' style={styles.textInput}>
                        {this.state.code}
                    </TextInput>

                    <TouchableOpacity
                        onPress={this.enterCode}
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
                        }}>تایید</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    enterCode = () => {
        context.setState({ sendData: true });
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
            })
        }).then((response) => response.json())
            .then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData);
                context.setState({ sendData: false });
                if (responseData.successful === true) {
                    AsyncStorage.setItem('api_code', responseData.api_code);
                    context.pushMainScreen( responseData.api_code);
                } else if (responseData.successful === false) {
                    alert('کد اشتباه است')
                }
                else if (responseData.sms_code !== null) {
                    alert('شماره کد را وارد کنید')
                }


            }).done();

    };

    pushMainScreen(api) {
        context.props.navigator.push({
            screen: 'example.Types',
            title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {
                navBarTranslucent: false
            }, // override the navigator style for the screen, see "Styling the navigator" below (optional)

            overrideBackPress: true,
            navigatorButtons: {
                leftButtons: [
                    {
                        id: 'ShoppingBasket',
                        icon: require('../../img/ShoppingBasket.png'),
                        style: {width: 5, height: 5}
                    },
                ],
                rightButtons: [

                    {
                        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                        icon: require('../../img/menu.png'), // for icon button, provide the local image asset name
                    }
                ],
            }, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            passProps: {api_code:api},

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
        margin: 50,
        marginBottom: 10,
        marginLeft: 10,
    },
    textInput: {
        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        fontFamily: 'B Yekan',
        width: '100%',

    },
    flex: {
        flex: 1,
    }
});
export default codeEnter;
