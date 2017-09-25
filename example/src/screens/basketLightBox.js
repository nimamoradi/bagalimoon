import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';
import PropTypes from 'prop-types';
class basketLightBox extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.content}>{this.props.content}</Text>
                </View>
                <View style={{flex: 2}}>
                    <Button
                        title={'بستن'}
                        onPress={() => this.props.onClose()}
                    />
                </View>
            </View>
        );
    }
}
basketLightBox.PropTypes={};
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.7,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
    },
    content: {
        marginTop: 8,
    },
});

export default basketLightBox;
