import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ListView, Image, Picker} from 'react-native';
import TypeButton from '../components/TypeButton'
import ItemView from '../components/itemView'
import ImageRow from "../components/ImageRow";

class TypePage extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        let Categories = props.Categories;

        let ViewArray = [{
            'title': 'dsa',
            'price': '1212',
            'count': '0',
            'imageUrl': "https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg"
        },
            {
                'title': 'dsa',
                'price': '1285',
                'count': '0',
                'imageUrl': "https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg"
            },
            {
                'title': 'dsa',
                'price': '165652',
                'count': '0',
                'imageUrl': "https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg"
            },
            {
                'title': 'ddsaadasd',
                'price': '1212',
                'count': '0',
                'imageUrl': "https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg"
            },
            {
                'title': 'dsa',
                'price': '1212',
                'count': '0',
                'imageUrl': "https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg"
            },
            {
                'title': 'dsa',
                'price': '1212',
                'count': '0',
                'imageUrl': "https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg"
            },
            {
                'title': 'dsa',
                'price': '1212',
                'count': '0',
                'imageUrl': "https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg"
            },
            {
                'title': 'dsa',
                'price': '1212',
                'count': '0',
                'imageUrl': "https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg"
            },];


        imageUrl = "https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg";
        this.state = {
            mainSelected: this.props.title,
            subSelected: 'مرغ',
            dataSourceView: ds.cloneWithRows(ViewArray),
            fields: ds,
            viewDate: ViewArray,
            Categories: Categories,
        }

    }

    componentDidMount() {
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


    render() {
        let mainItems = this.state.Categories.filter(function (x) {
            return x.parent_category_id === 0;
        }).map(function (x) {
            return <Picker.Item key={x.id} value={x.name} label={x.name}/>
        });


        let index = this.getIndex(this.state.mainSelected, this.state.Categories, 'name');
        let parent_id = this.props.Categories[index].id ;

        let subItems = this.state.Categories.filter(function (x) {
            return x.parent_category_id === parent_id;
        }).map(function (x) {
            return <Picker.Item key={x.id} value={x.name} label={x.name}/>
        });

        return (
            <View style={{flexDirection: 'column', height: '100%', backgroundColor: '#ffffff'}}>
                <View style={{flexDirection: 'row', flex: 0.13,}}>
                    <View style={styles.viewPicker}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.subSelected}
                            onValueChange={(itemValue, itemIndex) => this.setState({subSelected: itemValue})}>
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
                        title={columnData.title}
                        price={columnData.price}
                        count={columnData.count}
                        onUp={() => this.onUp(columnData)}
                        onDown={() => this.onDown(columnData)}
                        imageUrl={columnData.imageUrl}/>}
                />


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
