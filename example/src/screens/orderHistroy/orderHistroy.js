import React from 'react';

import {StyleSheet, View, ScrollView, Text, TouchableOpacity, AsyncStorage, FlatList,} from 'react-native';

import {vw, vh, vmin, vmax} from '../../viewport'
import server from "../../code";
import Loading from '../../components/loadScreen'
import fetch from '../../fetch'
import SmallRow from '../../components/smallRow'
import Entypo from 'react-native-vector-icons/Entypo';

let context;

class orderHistroy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: [],
            sendData: true,
            api_code: ''
        };
        context = this;

    }

    load_api_code = () => {
        AsyncStorage.getItem('api_code').then((item) => {

            context.setState({api_code: item}, () => {
                context.isAvailable();

            })

        })
    };


    isAvailable = () => {
        context.setState({sendData: true});

        context.getOrderHistory(context.state.api_code);

    };

    getOrderHistory = (api_code) => {

// console.log('apicode '+JSON.stringify(api_code));
        fetch(server.getServerAddress() + '/api/orderList', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_code: api_code,
            })
        }).then((response) => response.json())
            .then((responseData) => {
                // console.log(responseData);

                this.setState({
                    orderData: responseData,
                    sendData: false
                });

            }).catch(ignored => {
            server.retryParam(this.isAvailable, context)
        }).catch(ignored => {
            server.retryParam(this.isAvailable, context)
        });


    };

    componentDidMount() {
        this.load_api_code();
    }

    orderState(state) {
        switch (state) {
            case 0://in progress
                return <Text style={{
                    color: 'blue', fontSize: vw * 4,
                    margin: 20,
                    fontFamily: 'B Yekan',
                    alignSelf: 'flex-start'
                }}>در حال انجام</Text>;
            case 1://confirm
                return <Text style={{
                    color: 'green', fontSize: vw * 4,
                    margin: 20,
                    fontFamily: 'B Yekan',
                    alignSelf: 'flex-start'
                }}>تایید</Text>;
            case 2://order prepare
                return <Text style={{
                    color: 'blue', fontSize: vw * 4,
                    margin: 20,
                    fontFamily: 'B Yekan',
                    alignSelf: 'flex-start'
                }}>اماده سازی محصول</Text>;
            case 20://in progress
                return <Text style={{
                    color: 'green', fontSize: vw * 4,
                    margin: 20,
                    fontFamily: 'B Yekan',
                    alignSelf: 'flex-start'
                }}>تحویل شده</Text>;
            case 100://in progress
                return <Text style={{
                    color: 'red', fontSize: vw * 4,
                    margin: 20,
                    fontFamily: 'B Yekan',
                    alignSelf: 'flex-start'
                }}>لغو شده</Text>;
        }
        return <Text style={{color: 'blue'}}>در حال انجام</Text>;
    }

    paymentState(state) {
        switch (state) {
            case 0://online
                return <Text style={{
                    color: 'green', fontSize: vw * 4,
                    margin: 20,
                    fontFamily: 'B Yekan',
                    alignSelf: 'flex-start'
                }}>پرداخت اینترنتی</Text>;
            case 1://in place
                return <Text style={{
                    color: 'blue', fontSize: vw * 4,
                    margin: 20,
                    fontFamily: 'B Yekan',
                    alignSelf: 'flex-start'
                }}>پرداخت در محل</Text>;
        }

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
                        ListEmptyComponent={this.renderEmpty}
                        showsVerticalScrollIndicator={false}
                        style={{flex: 1, width: '100%',}}
                        keyExtractor={(item) => item.id}
                        data={this.state.orderData.reverse()}
                        renderItem={({item}) => <View style={{
                            backgroundColor: '#f2f2f2', borderRadius: 4 * vw,
                            margin: 4 * vw, borderWidth: 1, borderColor: 'black',
                            elevation: vw
                        }}>
                            <SmallRow title={'نام دریافت کننده'}
                                      des={item.receiver_name}/>
                            <SmallRow des={item.mobile_phone_number} title={'شماره تماس'}/>
                            <View style={styles.row}>
                                {this.orderState(item.state)}
                                <Text style={styles.text}>وضعیت سفارش</Text>
                            </View>

                            <View style={styles.row}>
                                {this.paymentState(item.financial_situation)}
                                <Text style={styles.text}>وضعیت پرداخت</Text>
                            </View>

                            <SmallRow title={'مبلغ قابل پرداخت'} des={this.numberFormat(item.paid_price) + " تومان"}/>
                            <SmallRow title={'مبلغ بدون تخفیف'} des={this.numberFormat(item.sum_price) + " تومان"}/>
                            <SmallRow title={'آدرس'} des={item.address.name + ' : ' + item.address.Address}/>
                            <View style={{
                                flexDirection: 'row', height: 8 * vh, justifyContent: 'center'
                                , alignItems: 'center',
                            }}>
                                {item.canPayOrder === true ?
                                    <TouchableOpacity onPress={() => this.address(item.id, item.address.id, item)}>
                                        <View style={styles.button}>
                                            <Text style={styles.textButton}>پرداخت آنلاین</Text>
                                        </View>
                                    </TouchableOpacity> : null}
                                <TouchableOpacity onPress={function () {
                                    server.pushScreenNavBar('example.Types.productView', 'محصولات',
                                        {
                                            basket: item.ordered_products,
                                            photos: item.photos
                                        }
                                        , context);
                                }}>
                                    <View style={styles.buttonCancel}>
                                        <Text style={styles.textButton}>مشاهده محصولات</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                        }

                    />

                </View>

            );

    }

    funcNoOp() {
    }

    address(id, address, item) {

        server.pushScreenTrans('example.Types.checkoutPage', 'پرداخت',
            {
                shouldUpdateBasket: context.funcNoOp,
                setBasket: context.funcNoOp,
                basket: [],
                fullBasket: [],
                order_id: id,
                api_code: context.props.api_code,
                address_id: 1000,
                address: item.address.name + ' : ' + item.address.Address,
                paid_price: item.paid_price,
                sum_price: item.sum_price,
                addressObject: item.address,
            }
            , context);
    }

    renderEmpty = () => {

        return (
            <View
                style={{

                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    borderRadius: vw,
                    borderColor: 'green'
                }}>
                <Entypo name="emoji-sad" size={vw * 25} color="red"/>
                <Text style={{
                    fontSize: vw * 4.5,
                    fontFamily: 'B Yekan',
                    color: 'black'
                }}>شما تا حالا سفارشی نداشتید</Text>
            </View>
        );

    };

}

orderHistroy.propTypes = {
    // api_code: PropTypes.string.isRequired,//encoded array in json

};

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },
    text: {
        fontSize: vw * 4,
        margin: 20,
        fontFamily: 'B Yekan',
        alignSelf: 'flex-end'
    },
    textButton: {
        fontSize: vw * 4,
        flex: 3,
        width: 12 * vw,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    },
    button: {
        width: 40 * vw,
        height: 10 * vh,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 2 * vw, flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#23d429',
        backgroundColor: '#23d42920'
    },
    buttonCancel: {
        height: 10 * vh,
        width: 40 * vw,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 2 * vw, flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#2d3bff',
        backgroundColor: '#86c1ff75'
    }
});

export default orderHistroy;
