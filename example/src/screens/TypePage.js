import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ListView, Image, Picker, Dimensions} from 'react-native';
import ItemView from '../components/itemView'
import ImageRow from "../components/ImageRow";
import server from '../code'
import Loading from '../components/loadScreen'
import Icon from 'react-native-vector-icons/MaterialIcons';

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

        this.state = {
            mainSelected: this.props.title,
            subSelected: Categories[sub].id,
            dataSourceView: ds.cloneWithRows([]),
            fields: ds,
            dataReady: true,
            viewDate: [],
            basket: [],
            Categories: Categories,
        };

        context = this;

    }

    componentDidMount() {
        if (isFirstTime) {

            let index = this.getIndex(this.props.title, this.props.Categories, 'name');
            let parent_id = context.state.Categories[index].id;
            let sub = this.getIndex(parent_id, this.props.Categories, 'parent_category_id');
            context.loadRenderRowData(0,  this.props.Categories[sub].id);
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

    loadRenderRowData = async (category_id, itemValue) => {
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

                context.state.basket.push({
                    'name': context.state.mainSelected + context.state.subSelected,
                    'value': responseData
                });
                context.setState({viewDate: responseData, dataReady: true}, () => {
                    context.componentDidMount();
                });

                console.log('response object:', responseData);


            }).done();
    };
    addToCart = () => {
        if (this.state.myNumber !== '0')
            this.props.navigator.showLightBox({
                screen: "example.Types.OrderItem",
                passProps: {
                    title: this.props.title,
                    price: this.props.price,
                    imageUrl: this.props.imageUrl,
                    count: this.state.myNumber,
                    content: 'به سبد خرید اضافه شد',
                    id: this.props.id,
                    onClose: this.dismissLightBox,
                },
                style: {
                    backgroundBlur: 'dark',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    tapBackgroundToDismiss: true
                }
            });
        else this.props.navigator.showLightBox({
            screen: "example.Types.LightBox",
            passProps: {
                title: 'توجه',
                content: 'مقدار کالا صفر است',
                onClose: this.dismissLightBox,
            },
            style: {
                backgroundBlur: 'red',
                backgroundColor: 'rgba(20, 0, 0, 0.5)',
                tapBackgroundToDismiss: true
            }
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
                        <Icon name="add-shopping-cart" size={30} color="#00aa00" style={{margin: 10}}/>
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

        this.setState({viewDate: updatedState,});

    };
    onDown = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.viewDate;
        let data = this.state.viewDate;
        if (updatedState[data.indexOf(rowdata)]['count'] !== 0) {
            updatedState[data.indexOf(rowdata)]['count']--;

        }
        console.log(updatedState);
        this.setState({viewDate: updatedState});

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
    },
    viewPickerText: {
        flex: 0.35,
        margin: 10,
        backgroundColor: '#aeb3ae20',
        borderRadius: 5,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    }
});

export default TypePage;
