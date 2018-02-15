import React from 'react';

import {StyleSheet, View, Text, TouchableHighlight, ScrollView, Image, Dimensions, AsyncStorage} from 'react-native';
import _ from 'lodash'

import {vw, vh, vmin, vmax} from '../viewport'
import TypeButton from "./TypeButton";

class myFlatList extends React.Component {

    render() {
        let list = this.props.data.map(function (item) {
            return <TypeButton title={item.name}
                               overlap
                               onPress={_.debounce(() => this.TypePage(item.name),
                                   1000, {leading: true, trailing: false})}
            />
        });
        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                horizontal={true}>
                <View style={{flex: 1,flexDirection:'row'}}>
                    {list}
                </View>
            </ScrollView>
        );
    }


}


const styles = StyleSheet.create({});


export default myFlatList;
