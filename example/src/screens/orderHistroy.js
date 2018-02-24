import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, AsyncStorage, FlatList,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import Loading from '../components/loadScreen'
import fetch from '../fetch'
import SmallRow from '../components/smallRow'

let context;

class orderHistroy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: [],
            sendData: true,
            api_code:''
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
                api_code:api_code,
            })
        }).then((response) => response.json())
            .then((responseData) => {
                // console.log(responseData);

                this.setState({
                    orderData: responseData,
                    sendData: false
                });

            }).catch(error => {
            // console.log(error);
            server.retryParam(this.isAvailable, context)
        }).catch(error => {
            // console.log(error);
            server.retryParam(this.isAvailable, context)
        });


    };

    componentDidMount() {
        this.isAvailable();
        this.load_api_code();
    }


    renderRow = (rowData) => {
        return (
            <View style={{flexDirection: 'row', height: 5 * vh}}>

                <Text style={styles.price}>{rowData.sum_price}</Text>

            </View>
        );
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
                        data={this.state.orderData}
                        renderItem={({item}) => <View>
                            <SmallRow title={'نام دریافت کننده'} des={item.receiver_name}/>
                            <SmallRow des={item.mobile_phone_number} title={'شماره تماس'}/>

                            <SmallRow title={'مبلغ قابل پرداخت'} des={item.paid_price}/>
                            <SmallRow title={'مبلغ بدون تخفیف'} des={item.sum_price}/>
                            <SmallRow title={'آدرس'} des={item.address.name + ' : ' + item.address.Address}/>
                            <FlatList
                                data={item.ordered_products}
                                renderItem={({item}) => <View>
                                    <SmallRow title={'نام محصول'} des={item.product.name}/>
                                    <SmallRow title={'تعداد'} des={item.count}/>
                                    <SmallRow title={'قیمت عادی'} des={item.regular_price}/>
                                    <SmallRow title={'قیمت بعد از تخفیف'} des={item.final_price}/>
                                </View>}
                            />
                            <SmallRow />
                        </View>
                        }

                    />

                </View>

            );

    }


}

orderHistroy.propTypes = {
    // api_code: PropTypes.string.isRequired,//encoded array in json

};

const styles = StyleSheet.create({
    row: {
        width: 100 * vw,
        paddingHorizontal: 2 * vw,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: vw * 4,
        flex: 1,
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
    tableHeader: {
        fontSize: vw * 5,
        fontFamily: 'B Yekan',
        flex: 1,
        margin: 10,
        color: '#000',
        textAlign: 'center'
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 5,
        marginTop: 20,
        margin: 2,
        marginLeft: 20,
        marginBottom: 60,
        fontFamily: 'B Yekan',
        alignContent: 'center',
        borderColor: '#23d429',
        backgroundColor: '#23d42920'
    },
    buttonCancel: {
        flex: 1,
        fontFamily: 'B Yekan',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 5,
        margin: 2,

        marginTop: 20,
        alignContent: 'center',
        marginRight: 20,
        marginBottom: 60,
        borderColor: '#d46e62',
        backgroundColor: '#d46e6220'
    }, container: {
        flex: 1,
        height: 100 * vh,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    item: {width: 40 * vw},

});

export default orderHistroy;
