import React from 'react';
import { StyleSheet, View, Text,  Button } from 'react-native';
import PropTypes from 'prop-types';
import { vw, vh, vmin, vmax } from '../viewport'
class newComment extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 8 }}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.content}>{this.props.content}</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Button
                        title={'بستن'}
                        onPress={() => this.props.onClose()}
                    />
                </View>
            </View>
        );
    }
}
newComment.propTypes = {
    title: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({
    container: {
        width: 70 * vw,
        height: 30 * vh,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    title: {
        fontSize: vw * 4,
        fontWeight: '700',
    },
    content: {
        fontSize: vw * 4,
        marginTop: 8,
    },
});

export default newComment;
