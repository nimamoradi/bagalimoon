import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, FlatList, View, Text, TouchableOpacity, AsyncStorage,
    ListView, Image, Picker, Dimensions
} from 'react-native';
import ItemView from '../components/itemView'
import server from '../code'
import Loading from '../components/loadScreen'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {vw, vh, vmin, vmax} from '../viewport'
import alertBox from "../components/alertBox";
import fetch from '../fetch'
import TypeButton from '../components/TypeButton'

let context;
let isFirstTime;

class TypePage extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        isFirstTime = true;
        let Categories = props.Categories;
        let subCategories = this.getIndex(this.props.title, this.props.Categories, 'name');
        let parent_id = Categories[subCategories].id;
        let sub = this.getIndex(parent_id, this.props.Categories, 'parent_category_id');
        let id = 0;
        if (sub > -1)
            id = Categories[sub].id;
        this.state = {
            mainSelected: this.props.title,
            subSelected: id,
            dataSourceView: ds.cloneWithRows([]),
            fields: ds,
            dataReady: true,
            viewDate: [],
            basket: [],
            Categories: Categories,
        };

        context = this;

    }


    shop = (basket) => {
        this.props.navigator.push({
            screen: 'example.Types.basketPreview',
            title: 'خرید را نهایی کنید',
            passProps: {
                isDynamic: true,
                basket: basket
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

    componentDidMount() {
        if (isFirstTime) {

            this.isAvailable();
            isFirstTime = false;
        }
        this.setState({
            dataSourceView: this.state.fields.cloneWithRows(this.state.viewDate),
        });
    }

    isAvailable = () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, server.getTimeOut(), 'Request timed out');
        });

        const request = fetch(server.getServerAddress());

        return Promise
            .race([timeout, request])
            .then(response => {
                context.setState({dataReady: true});
                let index = context.getIndex(context.state.mainSelected, context.state.Categories, 'name');
                let parent_id = context.state.Categories[index].id;
                let sub = context.getIndex(parent_id, context.state.Categories, 'parent_category_id');
                if (sub > -1)
                    context.loadRenderRowData(0, context.props.Categories[sub].id);
                else context.setState({viewDate: []}, () => {
                    context.setState({
                        dataSourceView: context.state.fields.cloneWithRows(this.state.viewDate),
                    });
                });
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


            }).catch(error => {
            server.retryParam(this.loadRenderRowData, context,)
        });
    };
    addToCart = () => {

        let basket = this.state.basket.map(
            function (x) {
                return x.value.filter(
                    function (y) {
                        return y.count > 0
                    }
                )
            }
        );
        let orderBasket = [];
        for (let i = 0; i < basket.length; i++) {
            console.log(basket[i]);
            orderBasket = orderBasket.concat(basket[i]);
        }
        if (orderBasket.length > 0) {
            console.log(orderBasket);
            this.shop(JSON.stringify(orderBasket));
        } else server.alert('توجه', 'محصولی انتخاب نشده', context)
        // AsyncStorage.getItem('@CurrentBasket').then((item) => {
        //
        //     item=  item.concat(basket);
        //     for(let i=0; i<item.length; ++i) {
        //         for(let j=i+1; j<item.length; ++j) {
        //             if(item[i].id === item[j].id)
        //                 item.splice(j--, 1);
        //         }
        //     }
        //
        //
        //     alert(JSON.stringify(item));
        // });


    };

    render() {

        let FlatListMainItem = this.state.Categories.filter(function (x) {
            return x.parent_category_id === 0;
        });

        let index = this.getIndex(this.state.mainSelected, this.state.Categories, 'name');
        let parent_id = this.props.Categories[index].id;

        let FlatListSubItem =this.state.Categories.filter(function (x) {
            return x.parent_category_id === parent_id;
        });
        return (

            <View style={{flexDirection: 'column', height: 100 * vh, backgroundColor: '#ffffff'}}>
                <View style={{flexDirection: 'row',height:11*vh}}>

                    <FlatList
                        horizontal={true}
                        data={FlatListMainItem}
                        renderItem={({item}) => <TypeButton title={item.name}/>}
                    />

                </View>
                <View style={{flexDirection: 'row', flex: 3}}>

                    <ListView
                        style={{width:70*vw}}
                        dataSource={this.state.dataSourceView}
                        renderRow={(columnData) =>
                            <ItemView
                                onPress={() => this.product(columnData.name,
                                    server.getServerAddress() + columnData.photo,
                                    columnData.long_description,
                                    columnData.price,
                                    columnData.count,
                                    columnData.id,
                                    columnData.main_price,
                                    columnData.off,
                                )}
                                title={columnData.name}
                                disscount={columnData.main_price}
                                price={columnData.price}
                                count={columnData.count}
                                onUp={() => this.onUp(columnData)}
                                onDown={() => this.onDown(columnData)}
                                imageUrl={server.getServerAddress() + columnData.photo}/>}
                    />
                    <FlatList
                        style={{width:25*vw}}
                        horizontal={false}
                        data={FlatListSubItem}
                        renderItem={({item}) => <TypeButton title={item.name}/>}
                    />
                </View>

                {(!this.state.dataReady ) && <View style={{
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
        height: 25 * vh,

    },
    viewPicker: {
        flex: 1,
        height: 9 * vh,
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
