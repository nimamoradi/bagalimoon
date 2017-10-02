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
        let dateArray = [{'name': 'پروتین', selected: false,}, {'name': 'غذایی', selected: false,},
            {'name': 'شوینده', selected: false,}, {'name': 'لبنیات', selected: false,},
            {'name': 'تنقلات', selected: false,}, {'name': 'نان', selected: false,},
            {'name': 'تنقلات', selected: false,}, {'name': 'نان', selected: false,},

        ];
        let subDataArray = [
            {'name': 'پروتین', 'value': [{'name': 'مرغ', selected: false,}, {'name': 'ماهی', selected: false,}]},
            {'name': 'غذایی', 'value': [{'name': 'مرغ', selected: false,}, {'name': 'غذا', selected: false,}]},
            {'name': 'شوینده', 'value': [{'name': 'مایع', selected: false,}, {'name': 'صابون', selected: false,}]},
            {'name': 'لبنیات', 'value': [{'name': 'شیر', selected: false,}, {'name': 'پنیر', selected: false,}]},
            {'name': 'تنقلات', 'value': [{'name': 'تنغ', selected: false,}, {'name': 'تنق', selected: false,}]},
            {'name': 'نان', 'value': [{'name': 'لواش', selected: false,}, {'name': 'سنگک', selected: false,}]},];

        this.state = {
            mainSelected: this.props.title,
            subSelected: 'مرغ',
            dataSourceTypes: dateArray,
            dataSourceTypesColumn: subDataArray,
            fields: ds,

        }

    }

    componentDidMount() {
        this.setState({
            fields: this.state.fields.cloneWithRows(this.state.dataSourceTypes),
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
        let mainItems = this.state.dataSourceTypes.map((s, i) => {
            return <Picker.Item key={i} value={s.name} label={s.name}/>
        });
        let index = this.getIndex(this.state.mainSelected, this.state.dataSourceTypesColumn, 'name');

        let subItems = this.state.dataSourceTypesColumn[index]['value'].map((s, i) => {
            return <Picker.Item key={i} value={s.name} label={s.name}/>
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
                    dataSource={this.state.fields}
                    renderRow={(columnData) => <ItemView
                        title="dsa" price="1212"
                        count="1"
                        onUp={this.onUp}
                        onDown={this.onDown}
                        imageUrl="https://app-1502027449.000webhostapp.com/image/0bb7de-550x600.jpg"/>}
                />


            </View>
        );
    }

    onUp = () => {


    };
    onDown = () => {
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
