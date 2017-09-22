import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Button, Image, Dimensions, AsyncStorage} from 'react-native';
import TableRow from '../../../components/tableRow';

class orderItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8}}>
                    <Text style={styles.title}>نمایش محصول</Text>
                    <TableRow title="اسم" des={this.props.title}/>
                    <TableRow title="قیمت هر محصول" des={this.props.price}/>
                    <TableRow title="تعداد" des={this.props.count}/>
                    <TableRow title="قیمت کل"
                              des={String(Number.parseInt(this.props.price) * Number.parseInt(this.props.count))}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}/>
                    <TouchableHighlight
                        style={styles.button1}
                        onPress={() => this.addProduct()}
                    ><Text>{'تایید'}</Text></TouchableHighlight>
                    <View style={{flex: 1}}/>
                    <TouchableHighlight
                        style={styles.button}


                        onPress={() => this.props.onClose(false)}
                    ><Text  >{'انصراف'}</Text></TouchableHighlight>
                    <View style={{flex: 1}}/>
                </View>
            </View>
        );
    }

    addProduct = async () => {


        let value;
        try {
            console.log('adding product');
            value = JSON.parse(await AsyncStorage.getItem('@CurrentBasket'));
            console.log('loading');
            if (value === null) {
                console.log('don\'t have previews value');
                value = [];
            }
            else
                console.log('have previews value ');

            value.push({
                'name': this.props.title,
                'count': this.props.count,
                'price': this.props.price,
                'id': this.props.id
            });
            console.log('new basket: ' + JSON.stringify(value));
            await  AsyncStorage.setItem('@CurrentBasket', JSON.stringify(value));

        } catch (error) {
            console.log('can\'t save data ' + error);
        }
        this.props.onClose(true);

    }
}


orderItem.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: '#ffffff',

        padding: 16,
    },
    button1: {
        borderRadius: 30,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
       backgroundColor:'#28ff4950'

    },
    button: {
        borderRadius: 30,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
        backgroundColor:'#c4282250'

    },
    title: {
        fontSize: 17,
        fontWeight: '700',
    },
    content: {
        marginTop: 8,
    },
});


export default orderItem;
