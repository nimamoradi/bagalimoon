import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Button, Image, Dimensions, AsyncStorage} from 'react-native';
import TableRow from '../components/tableRow';
import {vw, vh, vmin, vmax} from '../viewport'
class orderItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 8.5}}>
                    <Text style={styles.title}>نمایش محصول</Text>
                    <TableRow title="اسم" des={this.props.title}/>
                    <TableRow title="قیمت هر محصول" des={this.props.price+' تومان'}/>
                    <TableRow title="تعداد" des={this.props.count+' عدد'}/>
                    <TableRow title="قیمت کل"
                              des={String(Number.parseInt(this.props.price) * Number.parseInt(this.props.count))+' تومان'}/>
                    <View style={{height:20}}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row',marginTop:100}}>
                    <View style={{flex: 1}}/>
                    <TouchableHighlight
                        style={styles.button1}
                        onPress={() => this.addProduct()}
                    ><Text style={{ fontSize: vw*5,}}>{'تایید'}</Text></TouchableHighlight>
                    <View style={{flex: 1}}/>
                    <TouchableHighlight
                        style={styles.button}


                        onPress={() => this.props.onClose(false)}
                    ><Text style={{ fontSize: vw*5,}}>{'انصراف'}</Text></TouchableHighlight>
                    <View style={{flex: 1}}/>
                </View>
            </View>
        );
    }
    getIndex = (value, arr, prop) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    };

    addProduct = async () => {


        let value;
        try {
            // console.log('adding product');
            value = JSON.parse(await AsyncStorage.getItem('@CurrentBasket'));
            // console.log('loading');
            if (value === null) {
                // console.log('don\'t have previews value');
                value = [];
                value.push({
                    'name': this.props.title,
                    'count': this.props.count,
                    'price': this.props.price,
                    'id': this.props.id
                });
            }
            else
            {
                let index=this.getIndex(this.props.id,value,'id');
                // console.log('have previews value '+index);
                value[index]=({
                    'name': this.props.title,
                    'count': this.props.count,
                    'price': this.props.price,
                    'id': this.props.id
                });

            }


            // console.log('new basket: ' + JSON.stringify(value));
            await  AsyncStorage.setItem('@CurrentBasket', JSON.stringify(value));

        } catch (error) {
            // console.log('can\'t save data ' + error);
        }
        this.props.onClose(true);

    }
}


orderItem.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderRadius: 10,
        width:  vw*80,
        height: vh* 60,
        backgroundColor: '#ffffff',

        padding: 16,
    },
    button1: {
        fontSize: vw*5,
        fontFamily: 'B Yekan',
        borderRadius: 30,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
       backgroundColor:'#28ff4950'

    },
    button: {
        fontFamily: 'B Yekan',
        borderRadius: 30,
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
        backgroundColor:'#c4282250',
        fontSize: vw*5,
    },
    title: {
        fontFamily: 'B Yekan',
        fontSize: vw*5,
        fontWeight: '700',
    },

});


export default orderItem;
