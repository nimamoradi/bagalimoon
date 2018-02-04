import React from 'react';
import _ from 'lodash'
import {StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity, AsyncStorage,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import dataHandeling from "../dataHandeling";
import basketfile from "../basketFile";

let context;

class basketPreview extends React.Component {
    constructor(props) {
        super(props);
        props.navigator.setDrawerEnabled({side: 'right', enabled: false});
        let basket;
        if (props.isParsed !== true)
            basket = JSON.parse((this.props.basket));
        else basket = (this.props.basket);
        // console.log(basket);


        this.state = {
            basket: basket,
            totalPrice: '?'
        };
        context = this;
    }


    componentWillUnmount() {

        let basket = this.state.basket;

        this.props.UpdateBasket(basket);
        // super.componentWillUnmount();

    }


    componentDidMount() {
        let totalPrice = 0;
        let basket = this.state.basket.filter(function (item) {
            return item.count > 0
        });
        for (let i = 0; i < basket.length; i++) {
            totalPrice += Number.parseInt(basket[i]['price']) * Number.parseInt(basket[i]['count'])

        }

        this.setState({
            basket: basket,
            totalPrice: totalPrice,
        });
    }

    address = () => {
        if (this.state.totalPrice !== 0) {
            this.props.navigator.pop();
            this.props.navigator.push({
                screen: 'example.mapView',
                title: 'آدرس',
                passProps: {
                    basket: this.state.basket
                },
            });
        } else server.alert('توجه', 'هیچ کالای انتخاب نشده', this);
    };
    onUp = (rowdata) => {
        let rowDataCopy = Object.assign({}, rowdata);
        rowDataCopy.count++;
        let list = this.state.basket;
        let index = dataHandeling.indexOfId(list, rowdata.id);

        this.setState({
            basket: [...list.slice(0, index),
                rowDataCopy,
                ...list.slice(index + 1)]

        });
    };
    onDown = (rowdata) => {
        let rowDataCopy = Object.assign({}, rowdata);
        if (rowDataCopy.count !== 0) {
            rowDataCopy.count--;
        }
        let list = this.state.basket;
        let index = dataHandeling.indexOfId(list, rowdata.id);

        this.setState({
            basket: [...list.slice(0, index),
                rowDataCopy,
                ...list.slice(index + 1)]

        });
    };
    onCountChanged = (rowdata, down) => {
        let priceChange;
        if (down)
            priceChange = -Number.parseInt(rowdata.price, 10);
        else priceChange = Number.parseInt(rowdata.price, 10);
        priceChange = priceChange + Number.parseInt(this.state.totalPrice, 10);
        this.setState({totalPrice: priceChange});

    };

    renderRow = (rowData) => {
        return (
            <View style={{flexDirection: 'row'}}>

                <View style={{flexDirection: 'column', flex: 1}}>
                    <TouchableOpacity onPress={() => this.onUp(rowData)}>
                        <Icon name="plus" size={vw * 4} color="#17C408" style={{margin: 10}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onDown(rowData)}>
                        <Icon name="minus" size={vw * 4} color="#C42B2D" style={{margin: 10}}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>{rowData.count}</Text>
                <Text style={styles.price}>{rowData.price}</Text>
                <Text style={styles.text}>{rowData['name']}</Text>


            </View>
        );
    };

    render() {
        return (

            <View style={styles.container}>

                <View style={{flexDirection: 'row', width: '100%', height: 15 * vh}}>
                    <View style={styles.tableHeader}/>
                    <Text style={styles.tableHeader}>تعداد</Text>
                    <Text style={styles.tableHeader}>قیمت نهایی</Text>

                    <Text style={styles.tableHeader}>نام</Text>
                </View>
                <FlatList
                    style={{flexDirection: 'column', width: '100%',}}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.basket}
                    renderItem={({item}) =>
                        this.renderRow(item)}
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

                <View style={{flexDirection: 'row', alignContent: 'center',}}>
                    <TouchableOpacity style={{flex: 1, height: 20 * vh, width: 40 * vw}}
                                      onPress={_.debounce(this.address,
                                          1000, {leading: true, trailing: false})}
                    >
                        <View style={styles.button}>
                            <Icon name="shopping-cart" size={vw * 5} color="#00ff0050" style={{margin: 10}}/>
                            <View style={{flex: 0.5}}/>
                            <Text style={{flex: 1, fontSize: vw * 4,}}>پرداخت</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, height: 20 * vh, width: 40 * vw}}
                                      onPress={() => {
                                          basketfile.writeBasket([]);
                                          this.props.UpdateBasket(this.state.basket.map(function (item) {
                                              item.count = 0;
                                              return item;
                                          }));
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
        alignContent: 'center',
        borderColor: '#23d429',
        backgroundColor: '#23d42920'
    },
    buttonCancel: {
        flex: 1,

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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },

});

export default basketPreview;
