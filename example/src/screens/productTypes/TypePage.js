import React, {Component} from 'react';
import propTypes from 'prop-types';
import {
    View,Text,
    FlatList, TouchableOpacity,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import ItemView from './itemView'
import server from '../../code'
import Loading from '../../components/loadScreen'

import {vw, vh, vmin, vmax} from '../../viewport'

import dataHandeling from '../../dataHandeling';

import RightProductCorner from './rightProductCorner'
import ProductPageNavBar from '../../navBars/productPageNavBar'
import fetch from '../../fetch'

import ListViewCustum from "../../components/listViewCustum";


let context;
let isFirstTime;

class TypePage extends Component {
    setBasket(basket) {
        context.setState({basket: basket, basketSize: 0})
    }
    renderEmpty = () => {
        if (this.state.dataReady)
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
                    }}>کالای یافت نشد</Text>
                </View>
            );
        return null;
    };

    constructor(props) {
        super(props);
        let id = 0;


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
            if (Categories[parentId].parent_category_id !== 0)
                parentId = this.getIndex(Categories[parentId].parent_category_id, Categories, 'id');//find parent
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
            sorted: false,
            basketSize: this.props.basketSize
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

        let newBasket = dataHandeling.arrayUnique((context.state.basket.concat(context.props.basket)));
        if (dataHandeling.basketFilter(newBasket).length === 0)
            server.alert('توجه', 'سبد خرید خالی است', context);
        else this.props.navigator.push({
            screen: 'example.Types.basketPreview',
            title: 'خرید را نهایی کنید',
            passProps: {
                basket: newBasket,
                isTypePage: true,
                fullBasket: newBasket,
                setBasket: this.setBasket,
                UpdateBasket: TypePage.basketUpdaterSimple,
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

        let basket = this.state.basket;
        this.props.UpdateBasket(basket
        );
        context.setState({basket: []});

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
        (fetch(server.getServerAddress() + '/api/getProducts/' + category_id, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'content-encoding': "gzip, deflate, br"
            },

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
                server.retryParam(this.loadRenderRowData, context, category_id, error)
            }).catch(error => {
                server.retryParam(this.loadRenderRowData, context, category_id, error)
            }));


    };
    numberFormat = (x) => {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };

    topLoadData(item) {
        let subItems = context.findSubItems(context.state.Categories,
            item.id);
        context.setState({
            subItems: subItems, mainSelected: item.name,
            Category_id: subItems[0].id, subSelected: subItems[0].name
        });
        context.loadRenderRowData(subItems[0].id)
    }

    static basketUpdater(newItems) {//won't remove zero index
        let basket = context.state.basket.slice();
        let count = 0;
        for (let i = 0; i < basket.length; i++) {
            for (let j = 0; j < newItems.length; j++) {
                if (basket[i].id === newItems[j].id) {
                    if (newItems[j].count === 0 && basket[i].count !== 0)
                        count--;//item removed
                    basket[i] =
                        Object.assign({}, basket[i], newItems[j]);//upDating value of item in old basket
                    newItems[j].wasInBasket = true;
                }
            }
        }
        newItems = newItems.filter(function (item) {
            if (!item.hasOwnProperty('wasInBasket')) {////adding new  item to old basket
                delete item.wasInBasket;
                return item.count > 0;
            } else {
                return false;
            }

        });
        let bas = basket.concat(newItems);
        context.setState({
            basket: bas,
            basketSize: context.state.basketSize + count + newItems.length
        });
        return bas;

    }

    static basketUpdaterSimple(newItems, oldBasket) {
        let basket = oldBasket.slice();
        let count = 0;
        for (let i = 0; i < basket.length; i++) {
            for (let j = 0; j < newItems.length; j++) {
                if (basket[i].id === newItems[j].id) {
                    if (newItems[j].count === 0 && basket[i].count !== 0)
                        count--;//item removed
                    basket[i] =
                        Object.assign({}, basket[i], newItems[j], {count: newItems[j].count});//upDating value of item in old basket
                }
            }
        }

        context.setState({
            basket: basket,
            basketSize: context.state.basketSize + count
        });
        return basket;

    }

    sortAs() {
        let bas = context.state.basket.slice();
        context.setState({
            basket: bas.sort(function (a, b) {
                if (a.price < b.price) return -1;
                if (a.price > b.price) return 1;
                return 0;
            })
        })
    }

    sortDe() {
        let bas = context.state.basket.slice();
        context.setState({
            basket: bas.sort(function (a, b) {

                if (a.price > b.price) return -1;
                if (a.price < b.price) return 1;
                return 0;
            })
        })
    }

    render() {


        return (
            <View style={{backgroundColor: '#f2f2f2'}}>
                <ProductPageNavBar
                    basketSize={this.state.basketSize}
                    search={() => server.pushScreen('example.FlatListSearch', 'جستجو',
                        {
                            basket: dataHandeling.arrayUnique((context.state.basket.concat(context.props.basket))),
                            UpdateBasket: TypePage.basketUpdater
                        }, this)}//for search bar
                    style={{height: 10 * vh}} basket={this.addToCart} context={this}
                />
                <View style={{width: 100 * vw, height: 90 * vh}}>

                    <ListViewCustum
                        subSelected={this.state.mainSelected}
                        data={this.state.mainItems} action={this.topLoadData}/>

                    <View style={{height: 77 * vh, flexDirection: 'row'}}>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={{width: 75 * vw, marginBottom: 4 * vh}}
                            data={this.state.basket.filter((item) => {
                                return item.Category_id === this.state.Category_id;
                            })}
                            ListEmptyComponent={this.renderEmpty}
                            scrollEventThrottle={16}
                            removeClippedSubviews={true}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item}) =>
                                <ItemView
                                    keyExtractor={this._keyExtractor}
                                    title={item.name}
                                    off={item.off}
                                    disscount={(item.off !== 0) ? this.numberFormat(item.main_price) : null}
                                    price={this.numberFormat(item.price)}
                                    count={item.count}
                                    onUp={() => this.onUp(item)}
                                    onDown={() => this.onDown(item)}
                                    imageUrl={server.getServerAddress() + item.photo}/>}
                        />
                        <FlatList
                            style={{width: 30 * vw, marginBottom: 4 * vh}}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            data={this.state.subItems}
                            scrollEventThrottle={16}
                            removeClippedSubviews={true}
                            keyExtractor={this._keyExtractor}
                            renderItem={({item, index}) =>
                                <RightProductCorner title={item.name}
                                                    index={index}
                                                    onPress={() => {
                                                        context.loadRenderRowData(item.id);
                                                        context.setState({
                                                            Category_id: item.id,
                                                            subSelected: item.name
                                                        });

                                                    }}
                                                    isSelected={this.state.subSelected === item.name}
                                />}

                        />
                    </View>
                </View>
                {(!this.state.dataReady) &&
                <View style={{
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
                <View
                    style={{
                        position: 'absolute',
                        top: 85 * vh, left: 5 * vw,
                        backgroundColor: 'red',
                        width: 12 * vw,
                        height: 12 * vw,
                        borderRadius: 6 * vw,
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <TouchableOpacity onPress={() => {
                        context.state.sorted ? this.sortDe() : this.sortAs();
                        context.setState({sorted: !context.state.sorted});
                    }}>
                        <MaterialIcon name="sort" size={vw * 8} color="white" style={{}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    onUp = (rowdata) => {

        if (rowdata.max_in_order > rowdata.count) {
            let rowDataCopy = Object.assign({}, rowdata);
            rowDataCopy.count++;
            let list = this.state.basket;
            let index = dataHandeling.indexOfId(list, rowdata.id);
            if (rowdata.count !== 0)
                this.setState({
                    basket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)]
                });
            else
                this.setState({
                    basket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)],
                    basketSize: context.state.basketSize + 1
                });
        }
        else
            server.alert('توجه', 'محدویت سفارش این کالا ' + rowdata.max_in_order + ' می باشد', context)
    };
    onDown = (rowdata) => {

        let rowDataCopy = Object.assign({}, rowdata);
        if (rowDataCopy.count !== 0) {
            rowDataCopy.count--;
            let list = this.state.basket;
            let index = dataHandeling.indexOfId(list, rowdata.id);
            if (rowdata.count !== 1)
                this.setState({
                    basket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)]
                });
            else
                this.setState({
                    basket: [...list.slice(0, index),
                        rowDataCopy,
                        ...list.slice(index + 1)],
                    basketSize: context.state.basketSize - 1
                });
        }

    };
    _keyExtractor = (item, index) => item.id;
}

TypePage.propTypes = {
    title: propTypes.string.isRequired,
};


export default TypePage;
