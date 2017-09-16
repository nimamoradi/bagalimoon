import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, Image, ScrollView} from 'react-native';

class offer extends Component {


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Image style={styles.image} source={{uri: this.props.imageUrl}}/>
                    <Text style={styles.des}>{this.props.des}</Text>
                </View>
            </ScrollView>
        );
    }


}

offer.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    button: {
        marginTop: 16
    },
    title: {
        padding: 15,
        fontSize: 20,
        textAlign: 'center'

    }
    , des: {
        padding: 15,
        fontSize: 16,


    },
    image: {flex: 1, resizeMode: 'stretch', width: 400, height: 400}
});

export default offer;
