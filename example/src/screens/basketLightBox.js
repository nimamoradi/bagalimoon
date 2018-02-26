import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button, TouchableHighlight, AsyncStorage} from 'react-native';

import TableRow from '../components/tableRow'

import {vw, vh, vmin, vmax} from '../viewport'
import dataHandeling from '../dataHandeling'

class basketLightBox extends React.Component {
    constructor(props) {
        super(props);

    }





    render() {


            return (<View style={styles.container}>
                    <View style={{flex: 8}}>
                        <Text style={styles.title}>سبد خرید خالی است</Text>


                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>


                        <View style={{flex: 1}}/>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => this.props.onClose(false)}
                        ><Text style={{fontSize: vw * 4, fontFamily: 'B Yekan',}}>{'بستن'}</Text></TouchableHighlight>
                        <View style={{flex: 1}}/>

                    </View>


                </View>
            );
    }
}

basketLightBox.PropTypes = {};
const styles = StyleSheet.create({
    container: {
        width: vw * 75,
        height: vh * 30,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    button1: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
        backgroundColor: '#28ff4950'

    },
    button: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
        backgroundColor: '#c4282250',
    },
    title: {
        fontFamily: 'B Yekan',
        fontSize: vw * 4,
        fontWeight: '700',
    },
    content: {
        marginTop: 8,
    },
});

export default basketLightBox;
