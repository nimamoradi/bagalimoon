import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ListView} from 'react-native';
import TypeButton from '../components/TypeButton'

class TypePage extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            title:this.props.title,
            dataSourceTypes: ds.cloneWithRows(['پروتین', 'غذایی', 'تنقلات', 'شوینده', 'نان', 'لبنیات']),
            dataSourceTypesColumn: ds.cloneWithRows([['مرغ', 'ماهی'], 'غذایی', 'تنقلات', 'شوینده', 'نان', 'لبنیات'])
        }

    }

    columnRender = (columnData) => {

        if (columnData === this.state.title) {
            return <TypeButton backgroundColor='#4adc4650' title={columnData}/>
        }
        else {
            return <TypeButton backgroundColor='#4adc4615' onPress={()=>this.ItemChange(columnData)} title={columnData}/>
        }

    }
    ItemChange= async (title) => {
        await this.setState({'title': title});

    }

    render() {
        return (<View>
                <View style={{alignItems: 'flex-end'}}>

                    <ListView
                        style={{flexDirection: 'row', height: '100%', width: '25%',}}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        dataSource={this.state.dataSourceTypes}
                        renderRow={(columnData) =>this.columnRender(columnData)}
                    />
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
