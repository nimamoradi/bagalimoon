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

    makeList = (Data) => {


        context.setState({
            data: Data,
            loading: true,
        });
    };

    onUp = (rowdata) => {

        rowdata.count++;
        let list = this.state.data;
        let index = dataHandeling.indexOfId(list, rowdata.id);
        list[index].count = rowdata.count;
        this.setState({data: list});
    };
    onDown = (rowdata) => {
        if (rowdata.count !== 0) {

            let list = this.state.data;
            let index = dataHandeling.indexOfId(list, rowdata.id);
            list[index].count = rowdata.count - 1;
            this.setState({data: list});
        }

    };

    makeRemoteRequest = (item) => {

        this.setState({loading: false, noData: false});
        // if (this.state.data.length > 0)
        //     this.props.UpdateBasket(this.state.data)

            (fetch(server.getServerAddress() + '/api/search/' + item, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            }).then((response) => response.json().then((responseData) => {
                this.makeList(responseData.product)
            })).catch(error => {
                server.retryParam(this.makeRemoteRequest, context,)
            }).catch(error => {
                server.retryParam(this.makeRemoteRequest, context,)
            })).catch(error => {
                server.retryParam(this.makeRemoteRequest, context,)
            });
    };


    render() {
        return (
            <View>
                <SimpleNavbar back={() => this.props.navigator.pop()} title='جستجو'/>
                <FlatList
                    data={this.state.data}
                    style={{marginBottom: 5}}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) => (
                        <RectProduct
                            title={item.name}
                            disscount={item.main_price}
                            price={item.price}
                            count={item.count}
                            onUp={() => this.onUp(item)}
                            onDown={() => this.onDown(item)}
                            imageUrl={server.getServerAddress() + item.photo}/>
                    )}
                />
            </View>

        );
    }

    renderHeader = () => {
        return <View style={{margin: 4 * vw, flexDirection: 'row', flex: 1}}>
            <TouchableOpacity
                onPress={() => {
                    this.makeRemoteRequest(this.state.query);
                }}>
                <MaterialIcons name="search" size={vw * 8} color="red" style={{flex: 1}}/>
            </TouchableOpacity>
            <TextInput
                placeholder='نام کالا را وارد کنید'
                style={{
                    flex: 10,
                    height: 16 * vw, borderColor: 'gray',
                    borderRadius: 2 * vw, borderWidth: 1
                }}
                onChangeText={(text) => {
                    this.setState({query: text});
                }}
            >{this.state.query}</TextInput>


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
