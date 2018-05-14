import React from 'react';
import {StyleSheet, View, Text, Button, TouchableHighlight, AsyncStorage} from 'react-native';

import TableRow from '../../components/tableRow'

import {vw, vh, vmin, vmax} from '../../viewport'
import dataHandeling from '../../dataHandeling'

class basketLightBox extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {


        return (<View style={styles.container}>
                <View style={{
                    flex: 8, alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={styles.title}>سبد خرید خالی است</Text>


                </View>

                <Button
                    large
                    color="red"
                    title={'بستن'}
                    onPress={() => this.props.onClose(false)}
                />


            </View>
        );
    }
}

basketLightBox.propTypes = {};
const styles = StyleSheet.create({
    container: {
        width: vw * 45,
        height: vh * 30,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
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
        borderWidth: 0.5, flex: 4,
        height: 4 * vh,
        backgroundColor: '#c4282280',
    },
    title: {
        fontFamily: 'B Yekan',
        fontSize: vw * 4,
        fontWeight: '900',
    },
    content: {
        marginTop: 8,
    },
});

export default basketLightBox;
