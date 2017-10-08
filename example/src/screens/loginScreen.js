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
import server from '../code'
import Loading from '../components/loadScreen'

let this_class;

class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind();
        this.state = {
            sendData:false,
            phoneNumber: '09',
            login: this.login.bind(this)
        };
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false})
        this_class = this;
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
                newText = '';
                alert("فقط عددد وارد کنید");
                break;
            }

        }
        this.setState({phoneNumber: newText});
    };

    render() {
        return (
            <View style={styles.container}>



                <View style={{backgroundColor:'red'}}></View>



                <View style={styles.container}>

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
                        <Text style={styles.text}>
                            برای ورود شماره همراه خود را وارد کنید شماره فعال سازی برای شما پیامک می شود
                        </Text>

                        <Text style={styles.text}>شماره همراه</Text>
                        <TextInput
                            onChange={(event) => this.onChanged(event.nativeEvent.text)}
                            keyboardType='numeric' style={styles.textInput}>
                            {this.state.phoneNumber}
                        </TextInput>

                        <TouchableOpacity
                            onPress={this.doSignUp}
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
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    {(this.state.sendData == true) ? <Loading/>:null}
                </View>


            </View>        );
    }

    doSignUp() {
        this_class.setState({ sendData: true });
        console.log("inside post register");
        fetch(server.getServerAddress() + '/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                phone_number: this_class.state.phoneNumber,
            })
        }).then((response) => response.json())
            .then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData);
                this_class.setState({ sendData: false });
                if (responseData.successful === true) {
                    this_class.login({api_code: responseData.api_code});
                } else if (responseData.successful === false) {
                    alert('درخواست های زیاد با این شماره لطفا بعدا امتحان کنید')
                }
                else if (responseData.phone_number !== null) {
                    alert('شماره معتبر نمی باشد')
                }

            }).done();
    }


    login(props) {

        this_class.props.navigator.push({
            screen: 'example.Types.codeEnter',
            title: 'وارد کردن رمز', // title of the screen as appears in the nav bar (optional)
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
        margin: 50,
        marginBottom: 10,
        marginLeft: 10,
    },
    textInput: {
        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        alignSelf: 'center',
        width: '80%',

    },
    flex: {
        flex: 1,
    }
});

export default loginScreen;
