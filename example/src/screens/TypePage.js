import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ListView, Image, Picker, Dimensions} from 'react-native';
import ItemView from '../components/itemView'
import ImageRow from "../components/ImageRow";
import server from '../code'
import Loading from '../components/loadScreen'

let context;
let isFirstTime;

class TypePage extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        isFirstTime = true;
        let Categories = props.Categories;

        this.state = {
            mainSelected: this.props.title,
            subSelected: '',
            dataSourceView: ds.cloneWithRows([]),
            fields: ds,
            dataReady: true,
            viewDate: [],
            Categories: Categories,
        };

        context = this;

    }

    componentDidMount() {
        if (isFirstTime) {
            let id = this.getIndex(this.props.title, this.props.Categories, 'name');
            context.loadRenderRowData(0, 2);
            isFirstTime = false;
        }
        this.setState({
            dataSourceView: this.state.fields.cloneWithRows(this.state.viewDate),
        });
    }

    getIndex = (value, arr, prop) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    };

    loadRenderRowData=async(category_id, itemValue)=> {
        context.setState({dataReady: false, subSelected: itemValue});
        console.log('category_id ' + category_id + ' itemValue' + itemValue);
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
                context.setState({viewDate: responseData, dataReady: true}, () => {
                    context.componentDidMount();
                });

                console.log('response object:', responseData);



            }).done();
    }

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

                <ListView
                    style={{flex: 3}}
                    dataSource={this.state.dataSourceView}
                    renderRow={(columnData) => <ItemView
                        title={columnData.name}
                        price={columnData.price}
                        count={columnData.count}
                        onUp={() => this.onUp(columnData)}
                        onDown={() => this.onDown(columnData)}
                        imageUrl={server.getServerAddress() + columnData.photo}/>}
                />

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

        updatedState[updatedState.indexOf(rowdata)]['count']++;
        console.log(updatedState);
        this.setState({viewDate: updatedState});

    };
    onDown = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.viewDate;
        let data = this.state.viewDate;
        if (updatedState[data.indexOf(rowdata)]['count'] !== 0) {
            updatedState[data.indexOf(rowdata)]['count']--;

        }
        console.log(updatedState);
        this.setState({basket: updatedState});

    };

}

TypePage.propTypes = {
    title: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({
    picker: {
        flex: 1,
        margin: 10,

    },
    viewPicker: {
        flex: 1,
        margin: 10,
        backgroundColor: '#aeb3ae20',
        borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    }
});

export default TypePage;
