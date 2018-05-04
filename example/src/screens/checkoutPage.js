import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Linking

} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'
import Loading from '../components/loadScreen'
import fetch from '../fetch'
import Feather from 'react-native-vector-icons/Feather';
import SmallRow from '../components/smallRow'

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

        context.setState({
            sendData: true});
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
                    context.setState({
                        sendData: false,
                    });
                }

            }).catch(ignored => {
            // console.log('response error:', ignored);
            server.retryParam(this.getPayStatus, context)
        }).catch(ignored => {
            // console.log('response error:', ignored);

            server.retryParam(this.getPayStatus, context)
        });


    };


    numberFormat = (x) => {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };

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

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        zoomEnabled={false}
                        onRegionChangeComplete={(s) => {
                        }}
                        initialRegion={{
                            latitude: parseFloat(this.props.addressObject.lat),
                            longitude: parseFloat(this.props.addressObject.lng),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {((context.state.myLocation !== null)) ?
                            <MapView.Marker
                                coordinate={{
                                    latitude: parseFloat(this.props.addressObject.lat),
                                    longitude: parseFloat(this.props.addressObject.lng),
                                }}
                            /> : null}
                    </MapView>
                    <Text style={styles.text}>
                        جزییات سفارش
                    </Text>
                    <View style={{
                        height: 40 * vh, margin: 4 * vw, borderWidth: 2,
                        borderRadius: 4 * vw, borderColor: 'black',
                        backgroundColor: '#ADD8E650'
                    }}>
                        <SmallRow title={'شماره سفارش'} des={this.props.order_id}/>
                        <SmallRow title={'مبلغ قابل پرداخت'} des={this.numberFormat(this.props.paid_price) + " تومان"}/>
                        <SmallRow title={'مبلغ بدون تخفیف'} des={this.numberFormat(this.props.sum_price) + " تومان"}/>
                        <SmallRow title={'آدرس'} des={this.props.address}/>

                    </View>
                    <Text style={styles.text}>
                        
                    </Text>
                    <View style={{margin: 4 * vh}}/>
                    <TouchableOpacity onPress={() => {
                        context.props.navigator.popToRoot();

                        Linking.openURL('https://www.zarinpal.com/pg/pay/'
                            + this.state.order_checkout).then(() => {
                            context.props.navigator.popToRoot();
                        }).catch(err => server.alertAdvanced('اخطار', 'برنامه مرورگر یافت نشد', context, context.onClose)
                        );
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
            color: 'black'
        },
        textInput: {
            fontSize: vw * 5,
            borderRadius: 10,
            borderColor: '#bec4be',
            borderWidth: 0.5,
            fontFamily: 'B Yekan',
            width: '100%',
            color: 'black'

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
        map: {
            ...StyleSheet.absoluteFillObject,
        },
    });
export default checkoutPage;
