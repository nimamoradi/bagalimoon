import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, View, Text, TouchableOpacity, AsyncStorage,
    FlatList, Image, Picker, Dimensions
} from 'react-native';
import TypeButton from '../components/TypeButton'

import ItemView from '../components/itemView'
import server from '../code'
import Loading from '../components/loadScreen'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {vw, vh, vmin, vmax} from '../viewport'

import dataHandeling from '../dataHandeling';

let context;
let isFirstTime;

class TypePage extends Component {

    constructor(props) {
        super(props);
        let id = 0;
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});


        isFirstTime = true;
        let Categories = props.Categories;
        let index = this.getIndex(this.props.title, this.props.Categories, 'name');
        let mainSelected = this.props.title;
        let parent_id = Categories[index].id;
        let Category_id;

        if (Categories[index].parent_category_id !== 0) {

            let sub = this.getIndex(Categories[index].parent_category_id, this.props.Categories, 'id');
            mainSelected = Categories[sub].name;
            sub = this.getIndex(parent_id, this.props.Categories, 'parent_category_id');
            id = Categories[sub].name;
            Category_id = Categories[sub].id;
        } else {
            let sub = this.getIndex(parent_id, this.props.Categories, 'parent_category_id');

            if (sub > -1) {
                id = Categories[sub].name;
                Category_id = Categories[sub].id;
            }
        }
        let mainItems = Categories.filter(function (x) {
            return x.parent_category_id === 0;
        });


        let subItems = Categories.filter(function (x) {
            return x.parent_category_id === parent_id;
        });

        this.state = {
            Category_id: Category_id,
            mainSelected: mainSelected,
            subSelected: id,
            mainItems: mainItems,
            subItems: subItems,
            dataReady: false,
            viewDate: [],
            basket: [],
            Categories: Categories,
        };

        context = this;

    }

    addToCart = () => {

        let basket = this.state.basket.map(
            function (x) {
                return x.value
            }
        );

        // let arr = [];


        //
        // basket.forEach(function (element) {
        //
        //     element.forEach(function (item) {
        //
        //         arr.push(item)
        //     })
        //
        // });
        if (basket[0].length > 0) {
            this.shop(basket[0]);
        } else server.alert('توجه', 'محصولی انتخاب نشده', context)
    };

    shop = (basket) => {
        let newBasket = dataHandeling.AddBasket(basket, this.props.basket);
        if (newBasket.length === 0)
            server.alert('توجه', 'سبد خرید خالی است', context);
        this.props.navigator.push({
            screen: 'example.Types.basketPreview',
            title: 'خرید را نهایی کنید',
            passProps: {
                basket: newBasket,
                isParsed: true,
                UpdateBasket: this.props.UpdateBasket,
                setBasket: this.props.setBasket
            },
        });
    };
    product = (title, imageUrl, des, price, myNumber, id, disscount, off) => {
        this.props.navigator.push({
            screen: 'example.Types.subOffer',
            title: title,
            passProps: {
                title: title,
                imageUrl: imageUrl,
                des: des,
                price: price,
                myNumber: myNumber === '0' ? '' : myNumber,
                id: id,
                disscount: disscount,
                off: off,

            },
        });
    };

    componentWillUnmount() {


        let basket = this.state.basket.filter(
            function (x) {
                return x.count>0
            }
        );



        this.props.UpdateBasket(basket
        );

    }

    componentDidMount() {

        if (isFirstTime) {

            this.isAvailable();
            isFirstTime = false;
        }

    }

    isAvailable = () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, server.getTimeOut(), 'Request timed out');
        });

        const request = fetch(server.getInternetCheckAddress());

        return Promise
            .race([timeout, request])
            .then(response => {
                context.setState({dataReady: true});
                let index = context.getIndex(context.state.mainSelected, context.state.Categories, 'name');
                let parent_id = context.state.Categories[index].id;
                let sub = context.getIndex(parent_id, context.state.Categories, 'parent_category_id');
                if (sub > -1)
                    context.loadRenderRowData(context.state.Category_id, context.state.Categories[sub].name);
                else context.setState({viewDate: []});
            })
            .catch(error => {
                server.retry(this.isAvailable, context)
            });
    };

    getIndex = (value, arr, prop) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    };

    loadRenderRowData = async (category_id, subSelected) => {

        context.setState({dataReady: false});
        fetch(server.getServerAddress() + '/api/getProducts/' + category_id, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        }).then((response) => response.json())
            .then((responseData) => {
                    let lastBasket = this.props.basket;

                    for (let j = 0; j < lastBasket.length; j++) {
                        for (let i = 0; i < responseData.length; i++) {
                            if (lastBasket[j].id === responseData[i].id) {
                                responseData[i].count = lastBasket[j].count;
                            }
                        }
                    }


                    context.setState({
                        basket: dataHandeling.AddBasket(responseData, this.state.basket),
                        dataReady: true,
                        Category_id: category_id,
                        subSelected: subSelected
                    });
                }
            ).catch(error => {
            server.retryParam(this.loadRenderRowData, context,)
        });
    };

    render() {


        return (
            <View style={{flexDirection: 'column', height: 100 * vh, backgroundColor: '#ffffff'}}>


                <FlatList
                    style={{height: 10 * vh}}
                    horizontal={true}
                    data={this.state.subItems}
                    renderItem={({item}) =>
                        <TypeButton title={item.name}
                                    onPress={() => this.loadRenderRowData(item.id, item.name)}
                                    isSelected={this.state.subSelected === item.name}
                        />}


                />
                <View style={{height: 90 * vh, flexDirection: 'row'}}>

                    <FlatList
                        style={{width: 75 * vh, height: 78 * vh}}
                        data={this.state.basket.filter((item) => {
                            return item.Category_id === this.state.Category_id;
                        })}
                        renderItem={({item}) =>
                            <ItemView
                                onPress={() => this.product(item.name,
                                    server.getServerAddress() + item.photo,
                                    item.long_description,
                                    item.price,
                                    item.count,
                                    item.id,
                                    item.main_price,
                                    item.off,
                                )}
                                title={item.name}
                                disscount={item.main_price}
                                price={item.price}
                                count={item.count}
                                onUp={() => this.onUp(item)}
                                onDown={() => this.onDown(item)}
                                imageUrl={server.getServerAddress() + item.photo}/>}
                    />
                    <FlatList
                        style={{height: 100 * vh, width: 30 * vh}}
                        horizontal={false}
                        data={this.state.mainItems}
                        renderItem={({item}) =>
                            <TypeButton title={item.name}
                                        onPress={() => {
                                            let sub = context.getIndex(item.id,
                                                context.state.Categories, 'parent_category_id');
                                            let subItems = context.state.Categories.filter(function (x) {
                                                return x.parent_category_id === item.id;
                                            });

                                            context.setState({subItems: subItems});
                                            this.loadRenderRowData(context.state.Categories[sub].id,
                                                context.state.Categories[sub].name)
                                        }}
                                        isSelected={this.state.mainSelected === item.name}
                            />}

                    />
                </View>
                {(!this.state.dataReady) && <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loading/>
                </View>}
            </View>
        );
    }

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

}

TypePage.propTypes = {
    title: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({
    picker: {
        flex: 1,
        margin: 10,
        width: 35 * vw,
        height: 15 * vh,

    },
    viewPicker: {
        flex: 1,
        margin: 10,
        backgroundColor: '#aeb3ae20',
        borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    },
    viewPickerText: {
        width: vw * 15,
        height: vw * 15,
        margin: 10,
        backgroundColor: '#aeb3ae20',
        borderRadius: 5,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    }
});

export default TypePage;
