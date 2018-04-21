import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, AsyncStorage, FlatList,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import Loading from '../components/loadScreen'
import fetch from '../fetch'
import SmallRow from '../components/smallRow'
import SimpleItem from "../components/productItem/SimpleItem";
import SimpleHeader from "../components/productItem/SimpleHeader";

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
                        showsVerticalScrollIndicator={false}
                        style={{flex:1,width:'100%'}}
                        keyExtractor={(item) => item.id}
                        data={this.state.orderData}
                        renderItem={({item}) => <View style={{
                            backgroundColor: '#f2f2f2', borderRadius: 4 * vw,
                            margin: 2 * vw,
                        }}>
                            <SmallRow style={{backgroundColor: 'red'}} title={'نام دریافت کننده'}
                                      des={item.receiver_name}/>
                            <SmallRow des={item.mobile_phone_number} title={'شماره تماس'}/>

                            <SmallRow title={'مبلغ قابل پرداخت'} des={item.paid_price+" تومان"}/>
                            <SmallRow title={'مبلغ بدون تخفیف'} des={item.sum_price+" تومان"}/>
                            <SmallRow title={'آدرس'} des={item.address.name + ' : ' + item.address.Address}/>
                            <FlatList
                                style={{flex:1,width:'95%'}}
                                keyExtractor={(item) => item.id}
                                data={item.ordered_products}
                                ListHeaderComponent={<SimpleHeader/>}
                                renderItem={({item}) =>
                                    <SimpleItem regular_price={item.regular_price}
                                                name={item.product.name}
                                                final_price={item.final_price}
                                                count={item.count}/>}

                            />

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

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },


});

export default orderHistroy;
