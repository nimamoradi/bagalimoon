import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, WebView, Linking, Text, TouchableOpacity, AsyncStorage, ListView,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'
import server from "../code";
import Loading from '../components/loadScreen'

let context;

class aboutus extends React.Component {


    render() {

        return (

            <View style={styles.container}>
                <WebView
                    renderLoading={() => {
                        return <Loading/>
                    }}
                    startInLoadingState={true}
                    javaScriptEnabled={true}

                    source={{uri: server.getServerAddress() + '/about_us'}}
                />
            </View>
        );

    }
}

aboutus.propTypes = {};

const styles = StyleSheet.create({
    subText: {
        padding: 2 * vw,
        fontSize: vw * 5,
        flex: 1,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    },
    text: {
        padding: 10 * vw,
        fontSize: vw * 6,
        flex: 1,
        fontFamily: 'B Yekan',
        margin: 10,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeeceb'
    },

});

export default aboutus;
