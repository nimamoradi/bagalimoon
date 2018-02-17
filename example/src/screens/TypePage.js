import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, View,
    FlatList,
} from 'react-native';
import TypeButton from '../components/TypeButton'

import ItemView from '../components/itemView'
import server from '../code'
import Loading from '../components/loadScreen'

import {vw, vh, vmin, vmax} from '../viewport'

import dataHandeling from '../dataHandeling';

import RightProductCorner from '../Shapes/rightProductCorner'
import ProductPageNavBar from '../navBars/productPageNavBar'
import fetch from '../fetch'
import _ from 'lodash'

let context;
let isFirstTime;

class TypePage extends Component {

    static setBasket(basket) {
        context.setState({basket: basket})
    }

    constructor(props) {
        super(props);
        let id = 0;
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});

        this.props.navigator.setStyle({
            navBarHidden: true,
        });
        isFirstTime = true;
        let Categories = props.Categories;
        let index = this.getIndex(this.props.title, this.props.Categories, 'name');
        let mainSelected = this.props.title;
        let titleCategory_id = Categories[index].id;
        let Category_id;
        let subItems = [];
        if (Categories[index].parent_category_id !== 0) {//have parent

            let parentId = this.getIndex(Categories[index].parent_category_id, Categories, 'id');//find parent
            mainSelected = Categories[parentId].name;//add correct title
            id = Categories[index].name;
            Category_id = Categories[index].id;
            titleCategory_id = Categories[index].parent_category_id;
            subItems = Categories.filter(function (x) {
                return x.parent_category_id === titleCategory_id;
            });
        } else {//don't have parent
            // let sub = this.getIndex(titleCategory_id, Categories, 'parent_category_id');

            subItems = this.findSubItems(Categories, titleCategory_id);

            id = subItems[0].name;
            Category_id = subItems[0].id;
        }
        let mainItems = Categories.filter(function (x) {
            return x.parent_category_id === 0;
        });


        this.state = {
            Category_id: Category_id,
            mainSelected: mainSelected,
            subSelected: id,
            mainItems: mainItems,
            subItems: subItems,
            dataReady: false,
            basket: [],
            Categories: Categories,
        };

        context = this;

    }

    findSubItems(Categories, parent_id) {
        let Items = Categories.filter(function (x) {//find first child's
            return x.parent_category_id === parent_id;
        });


        return [].concat(...Items.map(item => {
                let inde = this.getIndex(item.id, Categories, 'parent_category_id');//

                if (inde > -1) {
                    // alert(Categories[inde].name);
                    return Categories.filter((x) => {
                        return x.parent_category_id === item.id;//find second child's
                    });
                }
                else
                    return item;
            }
        ));

    }

    addToCart = () => {

        // let basket = this.state.basket;
        // if (basket.length > 0) {
        this.shop();
        // alert(JSON.stringify(dataHandeling.basketFilter(this.state.basket)))
        // } else server.alert('توجه', 'محصولی انتخاب نشده', context)
    };

    shop = () => {

        // todo clean up
        let newBasket = dataHandeling.arrayUnique((context.props.basket.map((basketItem) => {
            //update first  basket values with new items then add missing items
            return {
                ..._.assign(context.props.basket, _.find(context.state.basket, ['id', basketItem.id]),
                    {count: basketItem.count})
            };

        })).concat(context.state.basket));
        if (dataHandeling.basketFilter(newBasket).length === 0)
            server.alert('توجه', 'سبد خرید خالی است', context);
        else this.props.navigator.push({
            screen: 'example.Types.basketPreview',
            title: 'خرید را نهایی کنید',
            passProps: {
                basket: newBasket,
                isParsed: true,
                UpdateBasket: this.props.UpdateBasket,
                setBasket: this.props.setBasket,
                setBasketProduct:TypePage.setBasket
            },
            navigatorStyle: {
                navBarHidden: true,
            }
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
                return x.count > 0
            }
        );
        this.props.UpdateBasket(basket
        );
        // super.componentWillUnmount();
    }

    componentDidMount() {
        if (isFirstTime) {
            this.isAvailable();
            isFirstTime = false;
        }

    }

    isAvailable = () => {

        let index = context.getIndex(context.state.mainSelected, context.state.Categories, 'name');
        let parent_id = context.state.Categories[index].id;
        let sub = context.getIndex(parent_id, context.state.Categories, 'parent_category_id');
        if (sub > -1)
            context.loadRenderRowData(context.state.Category_id);

    };

    getIndex = (value, arr, prop) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    };

    loadRenderRowData = async (category_id) => {

        context.setState({dataReady: false});
        fetch(server.getServerAddress() + '/api/getProducts/' + category_id, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'content-encoding': "gzip, deflate, br"
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
                    });
                }
            ).catch(error => {
            server.retryParam(this.loadRenderRowData, context,)
        }).catch(error => {
            server.retryParam(this.loadRenderRowData, context,)
        });
    };

    render() {


        return (
            <View style={{backgroundColor: '#f2f2f2'}}>
                <ProductPageNavBar style={{flex: 1}} basket={this.addToCart} context={this}/>

                <FlatList
                    style={{height: 10 * vh}}
                    horizontal={true}
                    data={this.state.subItems}
                    renderItem={({item}) =>
                        <TypeButton title={item.name}
                                    onPress={() => {
                                        this.loadRenderRowData(item.id);
                                        this.setState({
                                            Category_id: item.id,
                                            subSelected: item.name
                                        })
                                    }}
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
                        renderItem={({item, index}) =>
                            <RightProductCorner title={item.name}
                                                index={index}
                                                onPress={() => {
                                                    let subItems = this.findSubItems(context.state.Categories,
                                                        item.id);
                                                    context.setState({
                                                        subItems: subItems, mainSelected: item.name,
                                                        Category_id: subItems[0].id, subSelected: subItems[0].id
                                                    });
                                                    this.loadRenderRowData(item.id)
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

TypePage.PropTypes = {
    title: PropTypes.string.isRequired,

};


export default TypePage;
