import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button, TouchableHighlight, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import TableRow from '../components/tableRow'
import BasketPreView from './basketPreview'

class basketLightBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basket: '?',
            overAllPrice: '?',

        }
    }

    componentDidMount() {
        this.loadData().done()
    }

    async loadData() {
        const data = await AsyncStorage.getItem('@CurrentBasket');
        const json = await  JSON.parse(data);
        await console.log(json);
        let totalPrice = 0;
        if (json !== null)
            for (let i = 0; i < json.length; i++) {
                totalPrice += Number.parseInt(json[i]['price'], 10) * Number.parseInt(json[i]['count'], 10);
            }
        this.setState({json, totalPrice})
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
        if (this.state.basket !== null || this.state.basket !== '?')
            return (
                <View style={styles.container}>
                    <View style={{flex: 8}}>
                        <Text style={styles.title}>سبد خرید</Text>
                        <TableRow title="تعداد کالا" des={this.state.basket.length}/>
                        <TableRow title="قیمت کل" des={this.state.totalPrice}/>

                        <View>


                        </View>

                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}/>
                        <TouchableHighlight
                            style={styles.button1}
                            onPress={() => this.pushScreen('example.Types.basketPreview', 'خرید را نهایی کنید', {basket:this.state.basket})}
                        ><Text>{'خرید'}</Text></TouchableHighlight>
                        <View style={{flex: 1}}/>
                        <TouchableHighlight
                            style={styles.button}


                            onPress={() => this.props.onClose(false)}
                        ><Text>{'انصراف'}</Text></TouchableHighlight>
                        <View style={{flex: 1}}/>

                    </View>

                    <TouchableHighlight
                        style={{
                            flex: 1, borderWidth: 0.5, margin: 10, borderRadius: 5, justifyContent: 'center',
                            alignItems: 'center', backgroundColor: '#ebe22850'
                        }}
                        onPress={() => this.addProduct()}
                    ><Text>{'سبد های خرید قبلی'}</Text></TouchableHighlight>
                </View>
            );
        else return ( <View style={styles.container}>
                <View style={{flex: 8}}>
                    <Text style={styles.title}>سبد خرید خالی است</Text>


                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>


                    <View style={{flex: 0.5}}/>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.props.onClose(false)}
                    ><Text>{'بستن'}</Text></TouchableHighlight>
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
        height: Dimensions.get('window').height * 0.4,
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
        backgroundColor: '#c4282250'

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
