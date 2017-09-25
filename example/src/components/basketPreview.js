import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
function basketPreView({title,count}) {
    return (

        <View style={styles.row}>
            <Text style={styles.text}>{des}</Text>
            <Text style={styles.text}>{title} :</Text>
            <Text style={styles.price}>{title} :</Text>
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

basketPreView.propTypes = {
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    row: {

        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        textColor:'#28d715'
    }
});

export default basketPreView;
