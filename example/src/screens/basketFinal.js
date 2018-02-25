import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, View, ScrollView, FlatList, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import Loading from '../components/loadScreen'
import fetch from '../fetch'

let context;

class basketFinal extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});

        this.state = {
            basket: [],
            totalPrice: '?',
            sendData: true,
            customer_receiver_name: ''
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
                context.setState({sendData: false});
                let totalPrice = 0;
                let address = responseData['address'].name + ' : ' + responseData['address'].state_name + '،'
                    + responseData['address'].city_name + ' ،' + responseData['address'].Address;
                let basket = responseData.items;
                for (let i = 0; i < basket.length; i++) {
                    totalPrice += Number.parseInt(basket[i]['final_price']) * Number.parseInt(basket[i]['count'])
                }
                this.setState({
                    basket: basket,
                    totalPrice: totalPrice,
                    myAddress: address,
                    customer_receiver_name: responseData.customer_receiver_name
                });

            }).catch(error => {
            server.retryParam(this.isAvailable, context)
        }).catch(error => {
            server.retryParam(this.isAvailable, context)
        });


    };

    componentDidMount() {
        this.isAvailable();
    }


    renderRow = (rowData) => {
        return (
            <View style={styles.row}>

                <Text style={styles.price}>{rowData.final_price}</Text>
                <Text style={styles.price}>{rowData.regular_price}</Text>
                <Text style={styles.price}>{rowData.count}</Text>
                <Text style={styles.text}>{rowData['product']['name']}</Text>
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

                    <View style={{flexDirection: 'row', alignItems: 'flex-start', width: '100%', height: 15 * vh}}>
                        <Text style={styles.tableHeader}>قیمت نهایی</Text>
                        <Text style={styles.tableHeader}>قیمت عادی</Text>
                        <Text style={styles.tableHeader}>تعداد</Text>
                        <Text style={styles.tableHeader}>نام</Text>
                    </View>


                    <FlatList
                        automaticallyAdjustContentInsets={false}
                        contentContainerStyle={{flexDirection: 'column',}}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.basket}
                        renderItem={({item}) =>
                            this.renderRow(item)}
                    />

                    <View style={{flexDirection: 'row', alignItems: 'center',flex: 1}}>
                        <View style={{flex: 1}}/>
                        <Text style={styles.price}>
                            {this.state.totalPrice} تومان
                        </Text>
                        <Text style={styles.text}>
                            جمع خرید
                        </Text>
                        <View style={{flex: 1}}/>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center',flex: 1, width: 100 * vw}}>
                        <Text>آدرس:</Text>
                        <Text style={{
                            fontSize: vw * 4,
                            fontFamily: 'B Yekan',
                        }}>
                            {this.state.myAddress}
                        </Text>

                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center',flex: 1, width: 100 * vw}}>
                        <Text>نام مشتری:</Text>
                        <Text style={{
                            fontSize: vw * 4,
                            fontFamily: 'B Yekan',
                        }}>
                            {this.state.customer_receiver_name}
                        </Text>

                    </View>

                    <View style={{flexDirection: 'row',flex:2, }}>
                        <TouchableOpacity style={{flex: 1, height: 20 * vh, width: 40 * vw}}
                                          onPress={this.address}>
                            <View style={styles.button}>
                                <Icon name="shopping-cart" size={vw * 5} color="#00ff0050" style={{flex: 1}}/>
                                <View style={{flex: 0.5}}/>
                                <Text style={{flex: 1, fontSize: vw * 4,}}>پرداخت</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1, height: 20 * vh, width: 40 * vw}}
                                          onPress={() => {
                                              this.props.navigator.pop();
                                          }}>
                            <View style={styles.buttonCancel}>
                                <Text style={{flex: 1, fontSize: vw * 4,}}>حذف سفارش</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            );

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
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },

});

export default basketFinal;
