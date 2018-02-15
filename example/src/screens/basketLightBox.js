import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button, TouchableHighlight, AsyncStorage} from 'react-native';

import TableRow from '../components/tableRow'

import {vw, vh, vmin, vmax} from '../viewport'
import dataHandeling from '../dataHandeling'

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
        let json = dataHandeling.basketFilter(this.props.basket);
        if (json !== null) {
            let totalPrice = 0;

            for (let i = 0; i < json.length; i++) {
                totalPrice += json[i]['price'] * json[i]['count'];
            }
            let length = json.length;
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
            navigatorStyle: {
                navBarHidden: true,
            }
        });
    };

    render() {
        if (this.state.length !== 0)
            return (
                <View style={styles.container}>
                    <View style={{flex: 8}}>
                        <Text style={styles.title}>سبد خرید</Text>
                        <TableRow title="تعداد کالا" des={this.state.length + ' عدد'}/>
                        <TableRow title="قیمت کل" des={String(this.state.totalPrice) + ' تومان'}/>

                        <View>


                        </View>

                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}/>
                        <TouchableHighlight
                            style={styles.button1}
                            onPress={() => this.pushScreen('example.Types.basketPreview', 'لیست خرید',
                                {
                                    UpdateBasket: this.props.UpdateBasket,
                                    basket: this.state.basket,


                                })}
                        ><Text style={{fontSize: vw * 4,}}>{'خرید'}</Text></TouchableHighlight>
                        <View style={{flex: 1}}/>
                        <TouchableHighlight
                            style={styles.button}


                            onPress={() => this.props.onClose(false)}
                        ><Text style={{fontSize: vw * 4, fontFamily: 'B Yekan',}}>{'انصراف'}</Text></TouchableHighlight>
                        <View style={{flex: 1}}/>

                    </View>

                </View>
            );
        else return (<View style={styles.container}>
                <View style={{flex: 8}}>
                    <Text style={styles.title}>سبد خرید خالی است</Text>


                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>


                    <View style={{flex: 1}}/>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.props.onClose(false)}
                    ><Text style={{fontSize: vw * 4, fontFamily: 'B Yekan',}}>{'بستن'}</Text></TouchableHighlight>
                    <View style={{flex: 1}}/>

                </View>


            </View>
        );
    }
}

basketLightBox.PropTypes = {};
const styles = StyleSheet.create({
    container: {
        width: vw * 75,
        height: vh * 40,
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
        fontSize: vw * 4,
        fontWeight: '700',
    },
    content: {
        marginTop: 8,
    },
});

export default basketLightBox;
