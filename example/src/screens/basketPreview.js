import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class basketPreView {


    render() {
        return (

            <View style={styles.row}>
                <Text style={styles.text}>{this.props.title} :</Text>
                <Text style={styles.price}>{this.props.title} :</Text>
                <TouchableOpacity onPress={this.onUp}>
                    <Icon name="plus" size={30} color="#17C408" style={{margin: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onDown}>
                    <Icon name="minus" size={30} color="#C42B2D" style={{margin: 10}}/>
                </TouchableOpacity>
                <Text style={styles.price}>{count} :</Text>
            </View>

        );
    }

}

basketPreView.propTypes = {
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    row: {

        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: 16,
        margin: 20,
    },
    price: {
        fontSize: 16,
        margin: 20,
        color: '#28d715'
    }
});

export default basketPreView;
