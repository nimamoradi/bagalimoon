import React, {Component} from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    View,
    WebView

} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'
import Loading from '../components/loadScreen'
import fetch from '../fetch'

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
            webMassage: null
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

                if (responseData.ok === true)
                    context.setState({sendData: false, order_checkout: responseData.authority});


            }).catch(ignored => {
            // console.log('response error:', ignored);
            server.retryParam(this.getPayStatus, context)
        }).catch(ignored => {
            // console.log('response error:', ignored);

            server.retryParam(this.getPayStatus, context)
        });


    };

    onMessage(event) {

        switch (event.nativeEvent.data) {
            case'the paymant was unsuccessful':
                context.setState({webMassage: 'پرداخت موفقیت نبود بعدا امتحان کنید'});
                break;
            case'pss':
                context.setState({webMassage: 'پرداخت موفقیت آمیز بود '});
                context.props.setBasket(context.props.fullBasket.map(item => {
                    return Object.assign({}, item, {count: 0});
                }));
                context.props.shouldUpdateBasket(false);

                break;
            case'verified_before':
                context.setState({webMassage: 'سفارش قبلا پرداخت شده'});
                context.props.shouldUpdateBasket(false);
                context.props.setBasket(context.props.fullBasket.map(item => {
                    return Object.assign({}, item, {count: 0});
                }));
                break;
        }
        context.setState({webRes: true});
    }

    onClose() {
        context.props.navigator.dismissLightBox();
        switch (context.state.webMassage) {
            case'پرداخت موفقیت نبود بعدا امتحان کنید':
                context.props.navigator.popToRoot();
                break;
            case'پرداخت موفقیت آمیز بود ':
            case'سفارش قبلا پرداخت شده':
                context.props.navigator.popToRoot();
                break;
        }


    }

    render() {
        if (this.state.webRes) {
            server.alertAdvanced('توجه', this.state.webMassage, context, this.onClose)
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
                    <WebView
                        renderLoading={() => {
                            return <Loading/>
                        }}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        onMessage={this.onMessage}
                        injectedJavaScript={'var imgs = document.getElementsByTagName("img");for(var i=0, l=imgs.length;i<l;i++){imgs[i].src = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";}'}
                        source={{uri: 'https://sandbox.zarinpal.com/pg/StartPay/' + this.state.order_checkout}}
                    />
                </View>
            );

    }


}


checkoutPage.propTypes = {};

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
        fontSize: vw * 5,
        fontFamily: 'B Yekan',
        margin: 50,
        marginBottom: 10,
        marginLeft: 10,
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
export default checkoutPage;
