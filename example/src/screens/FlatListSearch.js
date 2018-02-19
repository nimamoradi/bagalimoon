import React from 'react';

import {StyleSheet, View, FlatList, TextInput} from 'react-native';


import {vw, vh, vmin, vmax} from '../viewport'

import ItemView from '../components/itemView'

import fetch from "../fetch";
import server from "../code";
import SimpleNavbar from "../navBars/SimpleNavbar";

class FlatListSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            query: '',
        };
    }


    makeRemoteRequest = (item) => {

        this.setState({loading: true});

        (fetch(server.getServerAddress() + '/api/search/' + item, {
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
        })).catch(error => {
            server.retry(context.makeRemoteRequest, context);
        });
    };


    render() {
        return (
            <View>
                <SimpleNavbar back={()=>this.props.navigator.pop()} title='جستجو'/>
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
            </View>

        );
    }

    renderHeader = () => {
        return <View style={{margin: 4 * vw, padding: 8 * vw}}>
            <TextInput
                placeholder='جستجو'
                style={{
                    height: 40, borderColor: 'gray',
                    borderRadius: 2 * vw, borderWidth: 1
                }}
                onChangeText={(text) => this.setState({text})}
                value={this.state.query}
            />
        </View>
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
