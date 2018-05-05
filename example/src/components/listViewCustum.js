import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView, Image
} from 'react-native';

import _ from 'lodash'
import TypeButton from "./TypeButton";
import {vh, vw} from "../viewport";


class listViewCustum extends React.Component {
    constructor(props) {
        super(props);
    }

    scrollListToStart(contentWidth, contentHeight) {
        this.scrollView.scrollTo({x: contentWidth});
    }
    scrollTo(contentWidth, contentHeight) {
        this.scrollView.scrollTo({x: contentWidth, y: contentHeight, animated: true})
    }
    render() {
        let listItem = this.props.data.map((item) => {
            return <TypeButton title={item.name}
                               key={item.id}
                               isSelected={this.props.subSelected === item.name}
                               onPress={_.debounce(() => this.props.action(item),
                                   1000, {leading: true, trailing: false})}
            />
        });

        return (
            <ScrollView
                ref={ref => this.scrollView = ref}
                onContentSizeChange={this.scrollListToStart.bind(this)}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.container}>
                <Image style={{width: 5 * vh, height: 10 * vh, marginRight:  vh}}
                       source={require('../../img/leftCorner.png')}/>
                {listItem}
                <Image style={{width: 5 * vh, height: 10 * vh, marginLeft: -2 * vh}}
                       source={require('../../img/cornerRight.png')}/>
            </ScrollView>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: vh, marginBottom: vh,
    },

});
export default listViewCustum;