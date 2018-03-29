import React, {Component} from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    View,
    WebView

} from 'react-native';
import {vw, vh, vmin, vmax} from '../viewport'
import Loading from '../components/loadScreen'
import fetch from '../fetch'

let context;
import server from '../code'


class checkoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            sendData: false,
        };

        context = this;
    }


    render() {
        return (
            <View style={styles.container}>
                <WebView
                         source={{uri: 'https://www.zarinpal.com/pg/StartPay/$Authority'}}
                />
            </View>
        );
    }


}


checkoutPage.propTypes = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeeceb'
    },
    rowMain: {},
    subRow: {
        flex: 1,
        margin: 50,
        flexDirection: 'column',
        alignItems: 'flex-end'

    },
    text: {
        fontSize: vw * 5,
        fontFamily: 'B Yekan',
        margin: 50,
        marginBottom: 10,
        marginLeft: 10,
    },
    textInput: {
        fontSize: vw * 5,
        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        fontFamily: 'B Yekan',
        width: '100%',

    },
    flex: {
        flex: 1,
    }, absolote: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default checkoutPage;
