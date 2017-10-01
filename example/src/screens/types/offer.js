import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class offer extends Component {
    constructor(props) {
        super(props);

        let productCount = '0';
        if (this.props.myNumber !== null)
            productCount = this.props.myNumber;
        this.state = {
            myNumber: '0',
            wasEmpty:true,
        }
    }


    onPopToRoot = () => {
        this.props.navigator.popToRoot();
    };
    desPan = () => {
        this.props.navigator.push({
            screen: 'example.Types.descriptionPan',
            title: 'hot offer',
            passProps: {
                date: data,
                size: size,
            },
        });
    };
    opinion = () => {
        this.props.navigator.push({
            screen: 'example.Types.opinion',
            title: 'نظرات',
            passProps: {
                title: ' hi',
            },

        });
    };


    componentDidMount() {
        this.loadData();

    }

    loadData = async () => {
        const data = await AsyncStorage.getItem('@CurrentBasket');
        let val;
        if (data === null) return 0;
        const json = await  JSON.parse(data);

        let index=  json.map(function(e) { return e.id; }).indexOf(this.props.id);

        if (index!==-1) {
            this.setState({myNumber: '' + json[index]['count'],wasEmpty:false});
        }
        console.log(json);

    };
    findIndex(array,id,id_number){
        return  array.map(function(e) { return e.id; }).indexOf(id_number);
    }
    onChanged = (text) => {
        let newText = '';
        let numbers = '0123456789';

        for (let i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("فقط عددد وارد کنید");
            }
            this.setState({myNumber: newText});
        }
    };
    onUp = () => {

        this.setState({myNumber: String(Number.parseInt(this.state.myNumber, 10) + 1)});

    };
    onDown = () => {
        if (Number.parseInt(this.state.myNumber, 10) !== 0)
            this.setState({myNumber: String(Number.parseInt(this.state.myNumber, 10) - 1)});
        else this.setState({myNumber: '0'});


    };

    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flex: 1, margin: 15, flexDirection: "column",
                    alignItems: "stretch",
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.6, flexDirection: 'column'}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#17c408'}}>{this.props.price}</Text>
                            <Text>قیمت :</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <TextInput
                                maxLength={2}
                                onChange ={ (event) => this.onChanged(event.nativeEvent.text)}
                                keyboardType='numeric' style={{textAlign: 'center'}}>
                              {this.state.myNumber}
                            </TextInput>
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

                            < Icon name="cart-plus" size={30} color="#17C408" style={{margin: 10}}/>
                        </TouchableOpacity>
                    </View>
                    <Image source={{
                        uri: this.props.imageUrl
                    }}
                           style={styles.image}/>

                </View>
                <View style={{flex: 0.35, justifyContent: "center", alignItems: "center"}}>
                    <View style={styles.flexRow}>
                        <TouchableOpacity
                            style={styles.flex}
                            onPress={this.opinion}
                        >
                            <Text style={styles.buttonText}>
                                نظرات کاربران
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.flex}
                            onPress={this.desPan}>
                            <Text style={styles.buttonText}>
                                مشخصات محصول
                            </Text>
                        </TouchableOpacity>

                    </View>


                </View>
                <View style={styles.flex}>
                    <Text>{this.props.des}</Text>
                </View>
            </ScrollView>
        );
    }

    addToCart = () => {
        if (this.state.myNumber !== '0')
            this.props.navigator.showLightBox({
                screen: "example.Types.OrderItem",
                passProps: {
                    title: this.props.title,
                    price: this.props.price,
                    imageUrl: this.props.imageUrl,
                    count: this.state.myNumber,
                    content: 'به سبد خرید اضافه شد',
                    id: this.props.id,
                    onClose: this.dismissLightBox,
                },
                style: {
                    backgroundBlur: 'dark',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    tapBackgroundToDismiss: true
                }
            });
        else this.props.navigator.showLightBox({
            screen: "example.Types.LightBox",
            passProps: {
                title: 'توجه',
                content: 'مقدار کالا صفر است',
                onClose: this.dismissLightBox,
            },
            style: {
                backgroundBlur: 'red',
                backgroundColor: 'rgba(20, 0, 0, 0.5)',
                tapBackgroundToDismiss: true
            }
        });
    };
    dismissLightBox = async (sendTOHome) => {
        this.props.navigator.dismissLightBox();
        if (sendTOHome)
            this.props.navigator.pop();

    };

}

offer.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    myNumber: PropTypes.string,
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,

    },
    flexRow: {flexDirection: 'row'},
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        padding: 15,
        fontSize: 20,
        textAlign: 'center'

    }
    , des: {},
    image: {
        flex: 1, alignSelf: 'stretch', width: undefined, height: undefined,
        borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    },
    buttonText: {
        textAlign: 'center',
        margin: 10,

        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,


    }
});

export default offer;
