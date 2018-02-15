import React from 'react';

import {StyleSheet, View, Text, FlatList, Dimensions, AsyncStorage} from 'react-native';
import _ from 'lodash'

import {vw, vh, vmin, vmax} from '../viewport'

import ItemView from '../components/itemView'
import {List, ListItem, SearchBar} from "react-native-elements";
import fetch from "../fetch";
import server from "../code";

class FlatListSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }


    makeRemoteRequest = (item) => {

        this.setState({loading: true});

        fetch(server.getServerAddress() + '/api/search/' + item, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.json().then((responseData) => {

            this.setState({data: JSON.parse(responseData), loading: false, refreshing: false,});

        })).catch(error => {
            server.retry(context.makeRemoteRequest, context);

        }).catch(error => {
            server.retry(context.makeRemoteRequest, context);
        });
    };


    render() {
        return (
            <List
                containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}
            >
                <FlatList
                    data={this.state.data}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({item}) => (
                        <ItemView
                            title={item.name}
                            disscount={item.main_price}
                            price={item.price}
                            count={item.count}
                            onUp={() => this.onUp(item)}
                            onDown={() => this.onDown(item)}
                            imageUrl={server.getServerAddress() + item.photo}/>
                    )}
                />

            </List>
        );
    }

    renderHeader = () => {
        return <SearchBar
            onChangeText={() => this.makeRemoteRequest('ماست')}
            lightTheme
            icon={{type: 'font-awesome', name: 'search'}}
            placeholder="جستجو..."
            platform="android"
        />;
    };
    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };
}

export default FlatListSearch;
