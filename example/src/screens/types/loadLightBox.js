import React from 'react';
import {StyleSheet,ActivityIndicator, View, Text, Button} from 'react-native';
import {vw, vh, vmin, vmax} from '../../viewport'

class loadLightbox extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8,}}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View
                    style={{
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        borderColor: "#CED0CE"
                    }}>
                    <ActivityIndicator animating size="large"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', alignItems: 'center', flex: 1,
        width: vw * 70,
        height: vh * 30,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    title: {
        fontSize: vw * 5,
        fontWeight: '700',
        fontFamily: 'B Yekan',
    },
    content: {
        fontSize: vw * 4,
        marginTop: 8,
        fontFamily: 'B Yekan',
    },
});

export default loadLightbox;
