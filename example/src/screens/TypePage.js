import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, View, Text, TouchableOpacity, AsyncStorage,
    FlatList, Image, Picker, Dimensions
} from 'react-native';

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
        if (Categories[index].parent_category_id !== 0) {
            let sub = this.getIndex(Categories[index].parent_category_id, this.props.Categories, 'id');
            mainSelected = Categories[sub].name;
            id = parent_id;
        } else {
            let sub = this.getIndex(parent_id, this.props.Categories, 'parent_category_id');

            if (sub > -1)
                id = Categories[sub].id;
        }

        this.state = {
            mainSelected: mainSelected,
            subSelected: id,
            dataReady: true,
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

        let arr = [];

        basket.forEach(function (element) {

            element.forEach(function (item) {

                arr.push(item)
            })

        });
        if (arr.length > 0) {
            this.shop(arr);
        } else server.alert('توجه', 'محصولی انتخاب نشده', context)
    };

    shop = (basket) => {
        this.props.navigator.push({
            screen: 'example.Types.basketPreview',
            title: 'خرید را نهایی کنید',
            passProps: {
                basket:   dataHandeling.AddBasket(basket, this.props.basket),
                isParsed: true,
                UpdateBasket: this.props.UpdateBasket,
                setBasket:this.props.setBasket
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


        let basket = this.state.basket.map(
            function (x) {
                return x.value
            }
        );

        basket = basket[0];

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
                    context.loadRenderRowData(0, context.props.Categories[sub].id);
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

    loadRenderRowData = async (category_id, itemValue) => {
        context.setState({dataReady: false, subSelected: itemValue});
        console.log("inside post load product");
        fetch(server.getServerAddress() + '/api/getProducts/' + itemValue, {

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
                    console.log("inside response json");
                    let index_of_data = context.getIndex(context.state.mainSelected + context.state.subSelected,
                        context.state.basket, 'name');

                    let oldbasket = context.state.basket;
                    if (index_of_data === -1)
                        oldbasket.push({
                            'name': context.state.mainSelected + context.state.subSelected,
                            'value': responseData
                        });
                    else
                        responseData = oldbasket[index_of_data].value;
                    context.setState({viewDate: responseData, dataReady: true, basket: oldbasket}, () => {
                        context.componentDidMount();
                    });

                    console.log('response object:', responseData);


                }
            ).catch(error => {
            server.retryParam(this.loadRenderRowData, context,)
        });
    };

    render() {
        let mainItems = this.state.Categories.filter(function (x) {
            return x.parent_category_id === 0;
        }).map(function (x) {
            return <Picker.Item key={x.id} value={x.name} label={x.name}/>
        });


        let index = this.getIndex(this.state.mainSelected, this.state.Categories, 'name');
        let parent_id = this.props.Categories[index].id;

        let subItems = this.state.Categories.filter(function (x) {
            return x.parent_category_id === parent_id;
        }).map(function (x) {

            return <Picker.Item key={x.id} value={x.id} label={x.name}/>
        });

        return (
            <View style={{flexDirection: 'column', height: '100%', backgroundColor: '#ffffff'}}>

                <View style={{flexDirection: 'row', flex: 0.13,}}>
                    <TouchableOpacity
                        onPress={this.addToCart}
                        style={styles.viewPickerText}>
                        <Icon name="add-shopping-cart" size={vw * 10} color="#00aa00" style={{margin: 10}}/>
                    </TouchableOpacity>
                    <View style={styles.viewPicker}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.subSelected}
                            onValueChange={(itemValue, itemIndex) => this.loadRenderRowData(itemIndex, itemValue)}>
                            {subItems}
                        </Picker>

                    </View>
                    <View style={styles.viewPicker}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.mainSelected}
                            onValueChange={(itemValue, itemIndex) => this.setState({mainSelected: itemValue})}>
                            {mainItems}
                        </Picker>
                    </View>

                </View>
                <FlatList
                    style={{flex: 3}}
                    data={this.state.viewDate}
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

        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.viewDate;
        let updatedbasket = this.state.basket;
        updatedState[updatedState.indexOf(rowdata)]['count']++;
        updatedbasket[updatedbasket.indexOf(updatedState)] = updatedState;
        console.log(updatedState);

        this.setState({viewDate: updatedState, basket: updatedbasket});

    };
    onDown = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.viewDate;
        let updatedbasket = this.state.basket;
        let data = this.state.viewDate;
        if (updatedState[data.indexOf(rowdata)]['count'] !== 0) {
            updatedState[data.indexOf(rowdata)]['count']--;
            updatedbasket[updatedbasket.indexOf(updatedState)] = updatedState;
        }
        console.log(updatedState);
        this.setState({viewDate: updatedState, basket: updatedbasket});

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
