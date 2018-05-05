import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Linking,
    Image,
    View,
    ScrollView,
    FlatList,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh,} from '../viewport'
import server from "../code";
import Loading from '../components/loadScreen'
import fetch from '../fetch'

import BasketItem from '../components/productItem/basketItem'

let context;

class basketFinal extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.api_code);
        this.state = {
            basket: [],
            totalPrice: '?',
            sendData: true,
            order_id: 0,
            sumPrice: 0,
            addressObject: {},
            customer_receiver_name: '',
            photos: [],
        };
        context = this;
        // console.log(dataArray)
    }

    isAvailable = () => {
        context.setState({sendData: true});
        context.getLastBasket();
    };

    getLastBasket = () => {

        // console.log("inside basket");
        fetch(server.getServerAddress() + '/api/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'content-encoding': "gzip, deflate, br"
            },
            body: JSON.stringify({
                api_code: context.props.api_code,
                address_id: context.props.id,
                customer_receiver_name: context.props.senderName,
                items: context.props.basket,

            })
        }).then((response) => response.json())
            .then((responseData) => {
                // console.log("inside responsejson");
                // console.log('response object:', responseData);
                // alert (JSON.stringify(responseData));
                context.setState({sendData: false});

                let address = responseData.order.address.name + ' : خراسان رضوی ،'
                    + 'مشهد ،' + responseData.order.address.Address;
                let basket = responseData.order.ordered_products;
                // alert(JSON.stringify(basket));
                let photos = responseData.order.photos;
                basket.map(function (item) {
                    item.imgUrl = photos[item.product.id];
                    return item;
                });

                this.setState({
                    basket: basket,
                    order_id: responseData.order.id,
                    totalPrice: responseData.order.order_outcome_price,
                    myAddress: address,
                    addressObject: responseData.order.address,
                    sumPrice: responseData.order.sum_price,
                    customer_receiver_name: responseData.order.receiver_name
                }, () => {
                    context.props.setBasket(context.props.fullBasket.map(item => {
                        return Object.assign({}, item, {count: 0});
                    }));
                    context.props.shouldUpdateBasket(false);
                });

            })

    };

    componentDidMount() {
        this.isAvailable();
    }

    numberFormat = (x) => {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
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
                <View style={styles.container}>

                    <FlatList
                        style={{flex: 4, marginTop: vh}}
                        horizontal={true}
                        keyExtractor={this._keyExtractor}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.basket}
                        renderItem={({item}) =>
                            <BasketItem price={this.numberFormat(item.final_price)}
                                        title={item['product']['name']}
                                        off={item.off}
                                        disscount={(item.off !== 0) ? this.numberFormat(item.regular_price) : null}
                                        imageUrl={server.getServerAddress() + '/' + item.imgUrl}
                                        count={item.count}/>}
                    />

                    <View style={{flexDirection: 'column', alignItems: 'center', flex: 0.5, width: 100 * vw}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                            <View style={{flex: 1}}/>
                            <Text style={styles.price}>
                                {this.numberFormat(this.state.totalPrice)} تومان
                            </Text>
                            <Text style={styles.text}>
                                جمع خرید
                            </Text>
                            <View style={{flex: 1}}/>
                        </View>

                        <Text>آدرس:</Text>
                        <Text style={{
                            fontSize: vw * 4,
                            fontFamily: 'B Yekan',
                        }}>
                            {this.state.myAddress}
                        </Text>


                        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                            <Text style={{
                                fontSize: vw * 4,
                                fontFamily: 'B Yekan',
                            }}>
                                {this.state.customer_receiver_name}
                            </Text>

                            <Text style={{
                                fontSize: vw * 4,
                            }}>نام مشتری:</Text>
                        </View>

                    </View>
                    <View style={{
                        flexDirection: 'row', height: 8 * vh, justifyContent: 'center'
                        , alignItems: 'center',
                    }}>

                        <TouchableOpacity onPress={() => {
                            this.address();

                        }}>
                            <View style={styles.button}>
                                <Icon name="shopping-cart" size={vw * 5} color="green"/>
                                <Text style={styles.textButton}>پرداخت آنلاین</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={function () {
                            server.alertAdvanced('با تشکر', 'سفارش به زودی برای شما ارسال می شود',context,context.onClose)
                        }}>
                            <View style={styles.buttonCancel}>
                                <Text style={styles.textButton}>پرداخت در محل</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            );

    }

    onClose() {
        context.props.navigator.dismissLightBox();
        context.props.navigator.popToRoot();
    }

    _keyExtractor = (item, index) => item.id;

    address() {
        server.pushScreenTrans('example.Types.checkoutPage', 'پرداخت',
            {
                shouldUpdateBasket: context.props.shouldUpdateBasket,
                setBasket: context.props.setBasket,
                basket: context.props.basket,
                fullBasket: context.props.fullBasket,
                order_id: context.state.order_id,
                api_code: context.props.api_code,
                address_id: context.props.id,
                address: this.state.myAddress,
                paid_price: this.state.totalPrice,
                sum_price: this.state.sumPrice,
                addressObject: this.state.addressObject,
            }
            , context);
    }
}

basketFinal.propTypes = {
    basket: PropTypes.array.isRequired,//encoded array in json
};

const styles = StyleSheet.create({

    row: {
        elevation: 2 * vw,
        borderColor: '#00000035',
        borderWidth: 0.75,
        margin: vw,
        borderRadius: 2 * vw,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        backgroundColor: '#e7e6e6',
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: vw * 4,
        flex: 3,
        width: 12 * vw,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    },
    textDes: {
        fontSize: vw * 4,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    },
    price: {
        margin: 10,
        fontSize: vw * 4,
        flex: 1,
        fontFamily: 'B Yekan',
        textAlign: 'center'
    },

    button: {
        width: 50 * vw,
        height: 16 * vh,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 5,
        margin: 2, flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#23d429',
        backgroundColor: '#23d42920'
    },
    buttonCancel: {
        height: 16 * vh,
        width: 50 * vw,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 5,
        margin: 2, flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#2d3bff',
        backgroundColor: '#86c1ff'
    }, container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    rowItem: {
        elevation: 2 * vw,
        borderColor: '#00000035',
        borderWidth: 0.75,
        margin: vw,
        flexDirection: 'row',
        borderRadius: 2 * vw,
        backgroundColor: '#e7e6e6',
        shadowOpacity: 0.6,
        shadowColor: '#e7e6e650',
        shadowOffset: {width: 10, height: 10},
    },

});

export default basketFinal;
