import React from 'react';
import _ from 'lodash'
import {StyleSheet, ImageBackground, View, Text, FlatList, Image, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import dataHandeling from "../dataHandeling";
import SimpleNavbar from '../navBars/SimpleNavbar'
import CountCircle from '../components/productItem/countCircle';

let context;

class basketPreview extends React.Component {
    constructor(props) {
        super(props);
        props.navigator.setDrawerEnabled({side: 'right', enabled: false});
        let basket = (this.props.basket);
        // console.log(basket);


        this.state = {
            basket: basket,
            totalPrice: '?',
            shouldUpdateBasket: true
        };
        context = this;
    }

    shouldUpdateBasket(value) {
        context.setState({shouldUpdateBasket: value});
    }

    componentWillUnmount() {


        this.props.navigator.setDrawerEnabled({side: 'right', enabled: true});
        if (context.state.shouldUpdateBasket) {
            let basket = this.state.basket;
            this.props.UpdateBasket(basket, this.props.basket);
            this.setState({basket: []});
        }
    }


    componentDidMount() {
        let totalPrice = 0;
        let basket = dataHandeling.basketFilter(context.state.basket);
        for (let i = 0; i < basket.length; i++) {
            totalPrice += basket[i]['price'] * basket[i]['count']
        }

        this.setState({
            basket: basket,
            totalPrice: totalPrice,
        });
    }

    address = () => {
        if (this.state.totalPrice !== 0) {
            // this.props.navigator.pop();
            this.props.navigator.push({
                screen: 'example.mapView',
                title: 'آدرس',
                passProps: {
                    setBasket: context.props.setBasket,
                    fullBasket: context.props.fullBasket,
                    basket: context.state.basket,
                    shouldUpdateBasket: this.shouldUpdateBasket
                },
            });
        } else server.alert('توجه', 'هیچ کالای انتخاب نشده', this);
    };
    onUp = (rowdata) => {
        let rowDataCopy = Object.assign({}, rowdata);
        rowDataCopy.count++;
        let list = this.state.basket;
        let index = dataHandeling.indexOfId(list, rowdata.id);
        this.onCountChanged(rowdata, false);
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
            this.onCountChanged(rowdata, true);
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
            priceChange = -rowdata.price;
        else priceChange = rowdata.price;
        priceChange = priceChange + this.state.totalPrice;
        this.setState({totalPrice: priceChange});

    };

    renderRow = (rowData) => {

        return (
            <View style={styles.rowItem}>
                <TouchableOpacity onPress={() => {
                    this.onDown(rowData);

                }}>
                    <Icon name="minus" size={vw * 8} color="black"/>
                </TouchableOpacity>

                <View style={{
                    flexDirection: 'column', justifyContent: 'center',
                    alignItems: 'center', flex: 1
                }}>
                    <Text style={styles.price}>{rowData.price}</Text>
                    <Text style={styles.price}>تومان</Text>
                    <CountCircle count={rowData.count}/>
                </View>
                <TouchableOpacity onPress={() => {
                    this.onUp(rowData);
                }
                }>
                    <Icon name="plus" size={vw * 8} color="black"/>
                </TouchableOpacity>
                <Text style={styles.text}>{rowData.name}</Text>
                <Image source={{uri: server.getServerAddress() + '/' + rowData.photo}}
                       style={{width: 16 * vw, height: 16 * vw, margin: 2 * vw}}
                />

            </View>
        );
    };
    _keyExtractor = (item, index) => item.id;

    render() {
        return (

            <View style={styles.container}>
                <SimpleNavbar back={() => {
                    this.props.navigator.pop({animated: true})
                }}
                              title={'لیست خرید'}/>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    style={{flexDirection: 'column', width: 85 * vw,}}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    data={this.state.basket}
                    renderItem={({item}) =>
                        this.renderRow(item)}
                />

                <ImageBackground
                    resizeMode="stretch"
                    style={{width: 90 * vw, height: 12 * vh, flexDirection: 'row',}}
                    source={require('../../img/basketPreview.png')}
                >


                    <TouchableOpacity onPress={_.debounce(this.address,
                        1000, {leading: true, trailing: false})}>
                        <ImageBackground
                            resizeMode="stretch"
                            style={styles.greenBox}
                            source={require('../../img/green.png')}
                        >

                            <Text style={{fontSize: vw * 5, color: 'black',}}>پرداخت</Text>

                        </ImageBackground>
                    </TouchableOpacity>
                    <ImageBackground
                        resizeMode="stretch"
                        style={styles.rightEdge}
                        source={require('../../img/basketPreview/rightEdge.png')}>
                        <View style={styles.center}>
                            <Text style={styles.price}>
                                مبلغ اصلی
                            </Text>
                            <Text style={styles.price}>
                                {this.state.totalPrice} تومان
                            </Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground
                        resizeMode="stretch"
                        style={styles.rightEdge}
                        source={require('../../img/basketPreview/rightEdge.png')}>
                        <Text> ji </Text>
                    </ImageBackground>
                    <ImageBackground
                        resizeMode="stretch"
                        style={styles.rightEdge}
                        source={require('../../img/basketPreview/rightEdge.png')}>
                        <Text> ji </Text>
                    </ImageBackground>
                </ImageBackground>


            </View>

        );

    }
}


const styles = StyleSheet.create({
    rightEdge: {
        marginLeft: -4 * vw,
        width: 24 * vw, height: 11 * vh,
    },
    greenBox: {
        width: 30 * vw,
        height: 12 * vh,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    row: {

        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
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
    text: {

        fontSize: vw * 4,
        flex: 1,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center',
        color: 'black'
    },
    price: {
        color: 'black',
        fontSize: vw * 3.75,
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

    container: {
        flex: 1,
        height: 100 * vh,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
    },

});

export default basketPreview;
