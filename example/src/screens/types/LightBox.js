import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {vw, vh, vmin, vmax} from '../../viewport'

class Lightbox extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8,}}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.content}>{this.props.content}</Text>
                </View>
                <View style={{flex: 2}}>
                    <Button
                        large
                        color="#44ff61"
                        title={'بستن'}
                        onPress={() => this.props.onClose()}
                    />
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

export default Lightbox;
