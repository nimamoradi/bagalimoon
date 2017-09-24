import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ListView, Image} from 'react-native';
import TypeButton from '../components/TypeButton'
import ItemView from '../components/itemView'
import ImageRow from "../components/ImageRow";

class TypePage extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dateArray = [{'name': 'پروتین', selected: false,}, {'name': 'غذایی', selected: false,},
            {'name': 'شوینده', selected: false,}, {'name': 'لبنیات', selected: false,},
            {'name': 'تنقلات', selected: false,}, {'name': 'نان', selected: false,}
        ];
        let subDataArray = [
            {'name': 'پروتین', 'value': [{'name': 'مرغ', selected: false,}, {'name': 'ماهی', selected: false,}]},
            {'name': 'غذایی', 'value': [{'name': 'مرغ', selected: false,}, {'name': 'غذا', selected: false,}]},
            {'name': 'شوینده', 'value': [{'name': 'مایع', selected: false,}, {'name': 'صابون', selected: false,}]},
            {'name': 'لبنیات', 'value': [{'name': 'شیر', selected: false,}, {'name': 'پنیر', selected: false,}]},
            {'name': 'تنقلات', 'value': [{'name': 'تنغ', selected: false,}, {'name': 'تنق', selected: false,}]},
            {'name': 'نان', 'value': [{'name': 'لواش', selected: false,}, {'name': 'سنگک', selected: false,}]},];
        let index = this.getIndex(this.props.title, dateArray, 'name');
        dateArray[index]['selected'] = true;
        this.state = {
            title: this.props.title,
            subtitle: this.props.title,
            fields: ds,
            subFields: ds,
            dataSourceTypes: dateArray,
            dataSourceTypesColumn: subDataArray,
        }

    }

    getIndex(value, arr, prop) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }


    componentDidMount() {
        this.setState({
            fields: this.state.fields.cloneWithRows(this.state.dataSourceTypes),
            subFields: this.state.subFields.cloneWithRows(this.state.dataSourceTypesColumn)
        });
    }

    subItemChange = (field) => {

        let dataClone = this.state.dataSourceTypesColumn;
        alert('subItemChange')
        for (let i = 0; i < dataClone.length; i++) {
            dataClone[i].selected = false;
            // dataClones.getRowData(0,i).renderRow();
            // dataClones.rowShouldUpdate(0,i);

        }


        field.selected = !field.selected;


        dataClone[field] = field;

        this.setState({
            data: dataClone, title: field.name,
        });
    };


    subColumnRender = (columnData) => {

        if (columnData['name'] === this.state.title)
            return <View style={{flexDirection: 'row',}}>{columnData['value'].map((i) => {

                if (i.selected) {
                    return <TypeButton title={i.name}/>
                }
                else {

                    return <TypeButton backgroundColor='#4adc4615' onPress={(i) => {

                        let dataClone = this.state.dataSourceTypesColumn;
                        let index = this.getIndex(this.state.title, this.state.dataSourceTypes, 'name');

                        for (let j = 0; j < dataClone[index]['value'].length; j++) {
                            dataClone[index]['value'][j].selected = false;

                        }

                        i.selected = true;


                        dataClone[index]['value'][i] = i;

                        this.setState({
                            dataSourceTypesColumn: dataClone, subtitle: i.name,
                        });

                    }
                    }
                                       title={i.name}/>
                }
            })}
            </View>;
        else return null;


    };


    columnRender = (columnData) => {

        if (columnData.selected) {
            return <TypeButton backgroundColor='#4adc4650' title={columnData.name}/>
        }
        else {
            return <TypeButton backgroundColor='#4adc4615' onPress={() => this.ItemChange(columnData)}
                               title={columnData.name}/>
        }

    };

    ItemChange = async (field) => {
        console.log(field);
        var dataClone = this.state.dataSourceTypes;
        console.log(dataClone);
        for (let i = 0; i < dataClone.length; i++) {
            dataClone[i].selected = false;
            // dataClones.getRowData(0,i).renderRow();
            // dataClones.rowShouldUpdate(0,i);

        }


        field.selected = !field.selected;


        dataClone[field] = field;

        this.setState({
            dataSourceTypes: dataClone, title: field.name,
        });
    };

    render() {
        return (<View style={{flexDirection: 'column', flex: 1}}>

                <ListView
                    style={{flexDirection: 'row', height: '10%', width: '100%', flex: 1}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    dataSource={this.state.subFields}
                    renderRow={(columnData) => this.subColumnRender(columnData)}
                />

                <View style={{flexDirection: 'row', flex: 9,}}>

                    <View style={{flexDirection: 'row', flex: 10,}}>
                        <ListView
                            contentContainerStyle={{
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }}
                            dataSource={this.state.fields}
                            renderRow={(columnData) => <ItemView title="dsa" price="1212"
                                                                 imageUrl="http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg"/>}
                        />

                    </View>
                    <View style={{flex: 4,}}>

                        <ListView
                            style={{flexDirection: 'row', flex: 5,}}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            dataSource={this.state.fields}
                            renderRow={(columnData) => this.columnRender(columnData)}
                        />
                    </View>
                </View>


            </View>

        );
    }


}

TypePage.propTypes = {
    title: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({});

export default TypePage;
