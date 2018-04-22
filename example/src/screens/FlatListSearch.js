import React from 'react';

import {StyleSheet, ActivityIndicator, TouchableOpacity, View, FlatList, TextInput} from 'react-native';


import {vw, vh, vmin, vmax} from '../viewport'

import RectProduct from '../components/productItem/RectProduct'

import fetch from "../fetch";
import server from "../code";
import SimpleNavbar from "../navBars/SimpleNavbar";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import dataHandeling from "../dataHandeling";
import basketFile from "../basketFile";


let context;

class FlatListSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            noData: false,
            query: '',
            lastBasket: props.basket
        };
        context = this;
    }
    numberFormat = (x) => {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };
    makeList = (responseData) => {
        let lastBasket = this.state.lastBasket;

        for (let j = 0; j < responseData.length; j++) {
            for (let i = 0; i < lastBasket.length; i++) {
                if (responseData[j].id === lastBasket[i].id) {
                    responseData[j].count = lastBasket[i].count;
                }
            }
        }

        context.setState({
            data: responseData,
            loading: true,
        });
    };

    onUp = (rowdata) => {
        if (rowdata.max_in_order > rowdata.count) {
            rowdata = Object.assign(rowdata, {count: rowdata.count + 1});
            let list = this.state.data;
            let index = dataHandeling.indexOfId(list, rowdata.id);
            list[index].count = rowdata.count;
            this.setState({data: list});
        } else
            server.alert('توجه', 'محدویت سفارش این کالا ' + rowdata.max_in_order + ' می باشد', context);
    };
    onDown = (rowdata) => {
        if (rowdata.count !== 0) {

            let list = this.state.data;
            let index = dataHandeling.indexOfId(list, rowdata.id);
            list[index] = Object.assign(rowdata, {count: rowdata.count - 1});
            this.setState({data: list});
        }

    };
    _keyExtractor = (item, index) => item.id;

    componentWillUnmount() {
        if (this.state.data.length > 0) {
            context.setState({lastBasket: this.props.UpdateBasket(this.state.data)});
        }
    }

    makeRemoteRequest = (item) => {

        this.setState({loading: false, noData: false});
        if (this.state.data.length > 0) {
            context.setState({lastBasket: this.props.UpdateBasket(this.state.data)});
        }

        (fetch(server.getServerAddress() + '/api/search/' + item, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.json().then((responseData) => {
            this.makeList(responseData.product)
        })).catch(ignored => {
            server.retryParam(this.makeRemoteRequest, context,)
        }).catch(ignored => {
            server.retryParam(this.makeRemoteRequest, context,)
        })).catch(ignored => {
            server.retryParam(this.makeRemoteRequest, context,)
        });
    };


    render() {
        return (
            <View>
                <SimpleNavbar back={() => this.props.navigator.pop()} title='جستجو'/>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    data={this.state.data}
                    style={{marginBottom: 10 * vh}}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) => (
                        <RectProduct
                            title={item.name}
                            disscount={(item.off !== 0) ? this.numberFormat(item.main_price) : null}
                            price={this.numberFormat(item.price)}
                            count={item.count}
                            off={item.off}
                            onUp={() => this.onUp(item)}
                            onDown={() => this.onDown(item)}
                            imageUrl={server.getServerAddress() + item.photo}/>
                    )}
                />
            </View>

        );
    }

    renderHeader = () => {
        return <View style={{
            margin: 4 * vw, flexDirection: 'row', flex: 1, borderColor: 'gray',
            borderRadius: 2 * vw, borderWidth: 1
        }}>
            <TouchableOpacity
                style={{
                    backgroundColor: '#4482c7',
                    height: 16 * vw,
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => {
                    this.makeRemoteRequest(this.state.query);
                }}>
                <MaterialIcons name="search" size={vw * 12} color="red" style={{flex: 1}}/>
            </TouchableOpacity>
            <TextInput
                placeholder='نام کالا را وارد کنید'
                style={{
                    flex: 10,
                    height: 16 * vw,
                }}
                onChangeText={(text) => {
                    this.setState({query: text});
                }}

                value={this.state.query}/>


        </View>
    };
    renderFooter = () => {
        if (this.state.loading) return null;

        if (this.state.noData)
            return <FontAwesome name="history" size={vw * 5} color="red" style={{flex: 5}}/>

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}>
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "95%",
                    backgroundColor: "#CED0CE",
                    margin: "2.5%"
                }}
            />
        );
    };
}

export default FlatListSearch;
