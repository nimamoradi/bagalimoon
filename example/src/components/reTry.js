import React, {Component} from 'react';
import {ActivityIndicator, BackHandler, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import _ from 'lodash'

class reTry extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});
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


                <MaterialCommunityIcons name="cloud-off-outline" size={vw * 40}
                                        color="#8B008B80" style={{margin: 2 * vw}}/>

                <Text style={styles.semiText}>ظاهرا ارتباط شما با سرور مشکل پیش آمده</Text>
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
                    <Text style={styles.text}> دوباره امتحان کنید</Text>
                </TouchableOpacity>
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
        width: 100 * vw,
        height: 100 * vh,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#99999910'
    },
    semiText: {
        fontSize: 5 * vw,
        fontFamily: 'B Yekan',
        margin: 5 * vw,
    },
    text: {
        fontSize: 5 * vw,
        fontFamily: 'B Yekan',
        margin: 5 * vw,
        borderWidth: 0.5,
        width: 45 * vw,
        height: 6 * vh,
        backgroundColor: '#d9d9d9',
        textAlign: 'center',
        alignSelf: 'center',
        color:'#1E90FF'
    }
});
export default reTry;