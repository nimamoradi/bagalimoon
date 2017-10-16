import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button, TouchableHighlight, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import TableRow from '../components/tableRow'
import BasketPreView from './basketPreview'
import {vw, vh, vmin, vmax} from '../viewport'

class basketLightBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basket: '?',
            overAllPrice: '?',
            length: '?'
        }
    }

    componentDidMount() {
        this.loadData().done()
    }

    async loadData() {
        const data = await AsyncStorage.getItem('@CurrentBasket');
        if (data !== null) {
            const json = await  JSON.parse(data);
            await console.log(json);
            let totalPrice = 0;

            for (let i = 0; i < json.length; i++) {
                totalPrice += Number.parseInt(json[i]['price'], 10) * Number.parseInt(json[i]['count'], 10);
            }
            let length = json.length
            let basket = JSON.stringify(json);
            this.setState({basket, totalPrice, length})
        }
    };

    pushScreen = (screen, title, passProps) => {

        this.props.navigator.dismissLightBox();
        this.props.navigator.push({
            screen: screen,
            title: title,
            passProps: passProps,
        });
    };

    render() {
        if (this.state.basket !== '?')
            return (
                <View style={styles.container}>
                    <View style={{flex: 8}}>
                        <Text style={styles.title}>سبد خرید</Text>
                        <TableRow title="تعداد کالا" des={this.state.length+' عدد'}/>
                        <TableRow title="قیمت کل" des={String(this.state.totalPrice)+' تومان'}/>

                        <View>


                        </View>

                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}/>
                        <TouchableHighlight
                            style={styles.button1}
                            onPress={() => this.pushScreen('example.Types.basketPreview', 'لیست خرید',
                                {
                                    basket: this.state.basket
                                })}
                        ><Text  style={{ fontSize: vw*4,}}>{'خرید'}</Text></TouchableHighlight>
                        <View style={{flex: 1}}/>
                        <TouchableHighlight
                            style={styles.button}


                            onPress={() => this.props.onClose(false)}
                        ><Text  style={{ fontSize: vw*4,  fontFamily: 'B Yekan',}}>{'انصراف'}</Text></TouchableHighlight>
                        <View style={{flex: 1}}/>

                    </View>

                </View>
            );
        else return ( <View style={styles.container}>
                <View style={{flex: 8}}>
                    <Text style={styles.title}>سبد خرید خالی است</Text>


                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>


                    <View style={{flex: 1}}/>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.props.onClose(false)}
                    ><Text style={{ fontSize: vw*4,  fontFamily: 'B Yekan',}}>{'بستن'}</Text></TouchableHighlight>
                    <View style={{flex: 1}}/>

                </View>


            </View>
        );
    }
}

basketLightBox.PropTypes = {};
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.35,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 16,
    },
    button1: {

        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
        backgroundColor: '#28ff4950'

    },
    button: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#bec4be',
        borderWidth: 0.5, flex: 2,
        backgroundColor: '#c4282250',


    },
    title: {
        fontFamily: 'B Yekan',
        fontSize: vw*4,
        fontWeight: '700',
    },
    content: {
        marginTop: 8,
    },
});

export default basketLightBox;
