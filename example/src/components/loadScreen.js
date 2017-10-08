import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';

class loadScreen extends Component {
    state = { animating: true };

    // closeActivityIndicator = ()  =>setTimeout(()  =>this.setState({animating: false }), 6000)
    //
    // componentDidMount = () => this.closeActivityIndicator();
    render() {
        const animating = this.state.animating;
        return (
            <View style = {styles.container}>
                <ActivityIndicator
                    animating = {animating}
                    color = '#bc2b78'
                    size = "large"
                    style = {styles.activityIndicator}/>
            </View>
        )
    }
}
export default loadScreen

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#eeeeee70',
        borderRadius: 5,
        padding: 16,

    },
    activityIndicator: {
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        // height: 150
    }
});