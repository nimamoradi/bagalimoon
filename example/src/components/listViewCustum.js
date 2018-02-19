import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';

import _ from 'lodash'
import TypeButton from "./TypeButton";
import {vh, vw} from "../viewport";
import HockeyApp from "react-native-hockeyapp";

class listViewCustum extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {data:props.data}

    }


    render() {
        let listItem = this.props.data.map((item) => {
            return <TypeButton title={item.name}
                               isSelected={this.props.subSelected === item.name}
                               onPress={_.debounce(() => this.props.action(item),
                                   1000, {leading: true, trailing: false})}

            />
        });

        return (
            <ScrollView
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.container}>
                {listItem}
            </ScrollView>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 2 * vh, marginBottom: 2 * vh,
    },

});
export default listViewCustum;