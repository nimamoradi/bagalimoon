import Row from '../components/Row'
// import UltimateListView from "react-native-ultimate-listview";
//
// export default class test extends Component {
//
//     sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time));
//
//     onFetch = async(page = 1, startFetch, abortFetch) => {
//         try {
//             //This is required to determinate whether the first loading list is all loaded.
//             let pageLimit = 24;
//             if (this.state.layout === 'grid') pageLimit = 60;
//             let skip = (page - 1) * pageLimit;
//
//             //Generate dummy data
//             let rowData = Array.from({length: pageLimit}, (value, index) => `item -> ${index + skip}`);
//
//             //Simulate the end of the list if there is no more data returned from the server
//             if (page === 10) {
//                 rowData = [];
//             }
//
//             //Simulate the network loading in ES7 syntax (async/await)
//             await this.sleep(2000);
//             startFetch(rowData, pageLimit);
//         } catch (err) {
//             abortFetch(); //manually stop the refresh or pagination if it encounters network error
//             console.log(err);
//         }
//     };
//
//     renderItem = (item, index, separator) => {
//         //write your own layout in list view
//     };
//
//     onPress = (index, item) => {
//         Alert.alert(index, `You're pressing on ${item}`);
//     };
//
//     render() {
//         return (
//             <UltimateListView
//                 ref={(ref) => this.listView = ref}
//                 onFetch={this.onFetch}
//                 // keyExtractor={(item, index) => `${this.state.layout} - ${item}`}  //this is required when you are using FlatList
//                 refreshableMode="advanced" //basic or advanced
//                 item={this.renderItem}  //this takes two params (item, index)
//                 // numColumn={this.state.layout === 'list' ? 1 : 3} //to use grid layout, simply set gridColumn > 1
//
//                 //----Extra Config----
//                 header={this.renderHeaderView}
//                 paginationFetchingView={this.renderPaginationFetchingView}
//                 //paginationFetchingView={this.renderPaginationFetchingView}
//                 //paginationAllLoadedView={this.renderPaginationAllLoadedView}
//                 //paginationWaitingView={this.renderPaginationWaitingView}
//                 //emptyView={this.renderEmptyView}
//                 //separator={this.renderSeparatorView}
//             />
//         );
//     }
// }


import React, {Component} from 'react';
import {View, StyleSheet,ListView, TouchableOpacity, ScrollView, Dimensions, ViewPagerAndroid, Text} from 'react-native';
//import { Constants } from 'expo';

const {width} = Dimensions.get('window');

export default class test extends Component {


    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        var dataVar = [
            {
                id:0,
                selected: true,
            },{
                id:1,
                selected: false,
            },{
                id:2,
                selected: false,
            }
        ];
        this.state = {
            data: dataVar,
            fields: ds,
        };
    }

    componentDidMount() {

        this.setState({
            fields: this.state.fields.cloneWithRows(this.state.data)
        });
    }


    handleClick(field) {
        console.log(field);
        var dataClone = this.state.data;

        for(let i=0;i<dataClone.length;i++){
            dataClone[i].selected = false;
            // dataClones.getRowData(0,i).renderRow();
            // dataClones.rowShouldUpdate(0,i);

        }


        field.selected = !field.selected;


        console.log(dataClone);

        dataClone[field.id] = field;

        this.setState({
            data: dataClone,
        });
    }

    renderField(field) {
        let color = (field.selected == true)?'green':'white';
        return (
            <TouchableOpacity onPress={this.handleClick.bind(this, field)} >
                <View style={{backgroundColor:color}}>
                    <Text style={{left:0, right:0, paddingVertical:50,borderWidth:1}}>     {field.id}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.fields}
                    renderRow={(field) => this.renderField(field)}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    }, viewPager: {
        width: 400,
        height: 400

    },
});

