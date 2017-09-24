import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function itemView({title, onPress, imageUrl, price, disscount}) {

    if (disscount == null) {
        return (
            <TouchableHighlight onPress={onPress}>
                <View style={styles.row}>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <Text style={styles.text}>{title}</Text>
                    <View style={styles.priceView}>
                    <Text style={styles.price}>{price}</Text>


                    </View>
                </View>
            </TouchableHighlight>
        );
    } else {

        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 0.6, flexDirection: 'column'}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#17c408'}}>{this.props.price}</Text>
                        <Text>قیمت :</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput
                            value={this.state.myNumber}
                            onChangeText={(text) => this.onChanged(text)}
                            keyboardType='numeric' style={{textAlign: 'center'}}/>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <TouchableOpacity onPress={this.onUp}>
                                <Icon name="plus" size={30} color="#17C408" style={{margin: 10}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onDown}>
                                <Icon name="minus" size={30} color="#C42B2D" style={{margin: 10}}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity
                        onPress={this.addToCart}>

                        <Icon name="cart-plus" size={30} color="#17C408" style={{margin: 10}}/>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

itemView.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    disscount: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {

        paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        width: '100%',
        fontSize: 16,

    },
    price: {flex: 1, fontSize: 16, color: '#17c408', textAlign: 'left'},
    discount: {flex: 1, textDecorationLine: 'line-through', fontSize: 16, color: '#d94c3d', textAlign: 'right'},
    image: {
        height: 150, minWidth: 100, borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    }
});

export default itemView;
