import React, {Component} from 'react';
import {ActivityIndicator, BackHandler, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import _ from 'lodash'

class reTry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
            param: this.props.param
        };
        props.navigator.onNavigatorEvent((event) => {
            if (event.id === 'backPress') {
                BackHandler.exitApp();
            }
        })
    }


    render() {
        return (
            <View style={styles.container}>
                {(this.props.massage !== null) ?
                    <Text style={styles.text}>{this.props.massage}</Text> :
                    <Text style={styles.text}>اتصال قطع شد</Text>}


                <TouchableOpacity

                    onPress={_.debounce(
                        () => {
                            if (this.state.param === null)
                                this.state.task();
                            else {
                                this.state.task(this.state.param);
                            }
                            this.props.navigator.pop();
                        },
                        1000, {leading: true, trailing: false}
                    )}
                >
                    <Icon name="redo" size={vw * 20} color="#777777" style={{margin: 2 * vw}}/>
                </TouchableOpacity>
                <Text style={styles.text}>دوباره امتحان کنید</Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee70',
        borderRadius: 5,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    activityIndicator: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#99999910'
    },
    text: {
        fontSize: 5 * vw,
        fontFamily: 'B Yekan',
        margin: 5 * vw,
    }
});
export default reTry;