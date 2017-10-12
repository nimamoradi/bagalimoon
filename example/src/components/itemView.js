import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'

function itemView({title, onUp, onDown, imageUrl, price, disscount, count, onPress}) {


    return (
        <View style={{}}>
            <View style={styles.row}>
                <View style={{flexDirection: 'row', alignSelf: 'flex-end',}}>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text
                            editable={false} selectTextOnFocus={false}
                            style={{textAlign: 'center',fontSize:vw*4}}>
                            {count}
                        </Text>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={styles.text}>{title}</Text>
                            <TouchableOpacity onPress={onUp}>
                                <Icon name="plus" size={vw*4} color="#17C408" style={{margin: 10}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDown}>
                                <Icon name="minus" size={vw*4} color="#C42B2D" style={{margin: 10}}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={onPress}>
                        <Image source={{uri: imageUrl}} style={styles.image}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.priceView}>
                    <View style={{flexDirection: 'row', alignContent: 'center'}}>
                        <Text style={styles.price}>{price}</Text>
                        <Text style={{fontSize:vw*4,}}>قیمت:</Text>
                    </View>
                    <Text style={styles.discount}>{disscount}</Text>

                </View>
            </View>
        </View>
    );

}

itemView.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    disscount: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    onUp: PropTypes.func.isRequired,
    onDown: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        backgroundColor: '#e8f0e820',
        padding: 20,
        margin: 10,
        width: Dimensions.get('window').width * 0.95,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        alignSelf: 'flex-end',
        fontSize:vw*5,
        marginRight: 20,
        textAlign: 'center'

    },
    price: {fontSize:vw*4, color: '#17c408', textAlign: 'left', marginRight: 10},
    discount: {flex: 1, textDecorationLine: 'line-through', fontSize:vw*4, color: '#d94c3d', textAlign: 'right'},
    image: {
        alignSelf: 'flex-end',
        height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 4,
        borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    }
});

export default itemView;
