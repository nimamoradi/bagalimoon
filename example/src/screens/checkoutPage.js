import React, {Component} from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    View,
    WebView, Text,
    Linking

} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'
import Loading from '../components/loadScreen'
import fetch from '../fetch'
import Feather from 'react-native-vector-icons/Feather';

let context;
import server from '../code'


class checkoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            sendData: true,
            order_checkout: null,
            webRes: false,
            webMassage: null,//code 1 good sell , code 2 sold already ,code 3 bad pay
            postMass: ''
        };

        context = this;
    }

    componentDidMount() {
        this.getPayStatus();
    }

    getPayStatus = () => {

        // console.log("inside basket", JSON.stringify({
        //     api_code: context.props.api_code,
        //     address_id: context.props.address_id,
        //     order_id: context.props.order_id,
        // }));
        fetch(server.getServerAddress() + '/api/payOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'content-encoding': "gzip, deflate, br"
            },
            body: JSON.stringify({
                api_code: context.props.api_code,
                address_id: context.props.address_id,
                order_id: context.props.order_id,
            })
        }).then((response) => response.json())
            .then((responseData) => {
                // console.log("inside responsejson");
                // console.log('response object:', responseData);
                // alert(JSON.stringify(responseData));
                if (responseData.ok === true && !responseData.hasOwnProperty('error'))
                    context.setState({sendData: false, order_checkout: responseData.authority});
                else if (responseData.ok === false && responseData.hasOwnProperty('error')) {
                    context.setState({
                        sendData: false, order_checkout: responseData.authority,
                        webRes: true, postMass: responseData.message_fa
                    });

                }
                alert(JSON.stringify(responseData));
            }).catch(ignored => {
            // console.log('response error:', ignored);
            server.retryParam(this.getPayStatus, context)
        }).catch(ignored => {
            // console.log('response error:', ignored);

            server.retryParam(this.getPayStatus, context)
        });


    };

    onMessage(event) {

        let data = JSON.parse(event.nativeEvent.data);

        if (data.succes === false)
            context.setState({webMassage: 3});

        else if (data.succes === true) {
            context.setState({webMassage: 1});
            context.props.setBasket(context.props.fullBasket.map(item => {
                return Object.assign({}, item, {count: 0});
            }));
            context.props.shouldUpdateBasket(false);


        }
        context.setState({webRes: true, postMass: data.massage_fa});
    }

    onClose() {
        context.props.navigator.dismissLightBox();
        context.props.navigator.popToRoot();
    }

    render() {
        if (this.state.webRes) {
            server.alertAdvanced('توجه', this.state.postMass, context, this.onClose)
        }

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
                <View style={styles.container}>
                    <Text style={styles.text}>
                        . برای تکمیل خرید صفحه را در مرورگر باز کنید
                    </Text>
                    <View style={{margin: 4 * vh}}/>
                    <TouchableOpacity onPress={() => {
                        context.props.navigator.popToRoot();

                        Linking.openURL('https://sandbox.zarinpal.com/pg/StartPay/'
                            + this.state.order_checkout).then(() => {
                            context.props.navigator.popToRoot();
                        }).catch(err => console.error('An error occurred', err));
                        context.props.navigator.popToRoot();
                    }}>
                        <View style={styles.button}>
                            <Feather name="chrome" size={vw * 5} style={{margin: 2 * vw,}} color="#ee1111"/>
                            <Text style={styles.text}>پرداخت</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );

    }

//     injectedJavaScript={'var imgs = document.getElementsByTagName("img");for(var i=0, l=imgs.length;i<l;i++){imgs[i].src = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";}'}
}


checkoutPage
    .propTypes = {};

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            height: 100 * vh,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f2f2f2',
        },
        rowMain: {},
        subRow: {
            flex: 1,
            margin: 50,
            flexDirection: 'column',
            alignItems: 'flex-end'

        },
        text: {
            fontSize: vw * 5,
            fontFamily: 'B Yekan',
        },
        textInput: {
            fontSize: vw * 5,
            borderRadius: 10,
            borderColor: '#bec4be',
            borderWidth: 0.5,
            fontFamily: 'B Yekan',
            width: '100%',

        },
        flex: {
            flex: 1,
        },

        button: {
            width: 70 * vw,
            height: 10 * vh,
            flexDirection: 'row',
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 5,
            margin: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#23d429',
            backgroundColor: '#23d42920'
        },
    });
export default checkoutPage;
