import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, AsyncStorage, ListView,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import Loading from '../components/loadScreen'

let context;

class orderHistroy extends React.Component {
    constructor(props) {
        super(props);

        context = this;
        AsyncStorage.getItem('api_code').then((item) => {
            this.state = {
                api_code: item,
                sendData: true
            };
        });

    }

    isAvailable = () => {
        context.setState({sendData: true});
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, server.getTimeOut(), 'Request timed out');
        });

        const request = fetch(server.getServerAddress());

        return Promise
            .race([timeout, request])
            .then(response => {

                context.getOrderHistory();
            })
            .catch(error => {
                server.retry(this.isAvailable, context)
            });
    };

    getOrderHistory = () => {


        fetch(server.getServerAddress() + '/api/orderList', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_code: context.state.api_code,
            })
        }).then((response) => response.json())
            .then((responseData) => {

                context.setState({sendData: false});
                let totalPrice = 0;
                let address = responseData['address'].name + ' : ' + responseData['address'].state_name + '،'
                    + responseData['address'].city_name + ' ،' + responseData['address'].Address;
                let basket = responseData.items;
                for (let i = 0; i < basket.length; i++) {
                    totalPrice += Number.parseInt(basket[i]['final_price']) * Number.parseInt(basket[i]['count'])
                }
                this.setState({
                    dataSourceBasket: this.state.dataSourceProducts.cloneWithRows(basket),
                    totalPrice: totalPrice,
                    myAddress: address,
                    customer_receiver_name: responseData.customer_receiver_name
                });

            }).catch(error => {
            server.retry(this.isAvailable, context)
        });


    };

    componentDidMount() {
        this.isAvailable();
    }


    renderRow = (rowData) => {
        return (
            <View style={{flexDirection: 'row'}}>

                <Text style={styles.price}>{rowData.final_price}</Text>
                <Text style={styles.price}>{rowData.regular_price}</Text>
                <Text style={styles.price}>{rowData.count}</Text>
                <Text style={styles.text}>{rowData['product']['name']}</Text>
            </View>
        );
    };
    renderOrder = () => {
        return (<View>

            <View style={{flexDirection: 'row', alignItems: 'flex-start', width: '100%', height: 15 * vh}}>
                <Text style={styles.tableHeader}>قیمت نهایی</Text>
                <Text style={styles.tableHeader}>قیمت عادی</Text>
                <Text style={styles.tableHeader}>تعداد</Text>
                <Text style={styles.tableHeader}>نام</Text>
            </View>

            <ListView

                automaticallyAdjustContentInsets={false}
                contentContainerStyle={{flexDirection: 'column', alignItems: 'flex-start', width: '100%',}}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                dataSource={this.state.dataSourceBasket}
                renderRow={(rowData) =>
                    this.renderRow(rowData)}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', height: '10%'}}>
                <View style={{flex: 1}}/>
                <Text style={styles.price}>
                    {this.state.totalPrice} تومان
                </Text>
                <Text style={styles.text}>
                    جمع خرید
                </Text>
                <View style={{flex: 1}}/>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center', width: 100 * vw}}>
                <Text>آدرس:</Text>
                <Text style={{
                    fontSize: vw * 4,
                    fontFamily: 'B Yekan',
                }}>
                    {this.state.myAddress}
                </Text>

            </View>
            <View style={{flexDirection: 'column', alignItems: 'center', width: 100 * vw}}>
                <Text>نام مشتری:</Text>
                <Text style={{
                    fontSize: vw * 4,
                    fontFamily: 'B Yekan',
                }}>
                    {this.state.customer_receiver_name}
                </Text>

            </View>
        </View>);
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


                </View>

            );

    }
}

orderHistroy.propTypes = {
    api_code: PropTypes.string.isRequired,//encoded array in json

};

const styles = StyleSheet.create({
    row: {

        paddingHorizontal: 16,
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

});

export default orderHistroy;
