import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class offer extends Component {
    constructor(props){
        super(props);
        this.state={
            myNumber:'0',
        }
    }

    desPan = () => {
        this.props.navigator.push({
            screen: 'example.Types.descriptionPan',
            title: 'hot offer',
            passProps: {
                date:data ,
                 size:size,
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
    onChanged = (text) => {
        let newText = '0';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
            this.setState({myNumber: newText});
        }
    };
    onUp = () => {

        this.setState({myNumber:String(  Number.parseInt(this.state.myNumber, 10) + 1)});

    }
    onDown = () => {
        if( Number.parseInt(this.state.myNumber, 10)!==0)
        this.setState({myNumber: String(Number.parseInt(this.state.myNumber, 10) - 1)});
        else  this.setState({myNumber: '0'});


    }
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
                            <Text style={{color: '#17c408'}}>{this.price}</Text>
                            <Text>قیمت :</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <TextInput
                                value = {this.state.myNumber}
                                onChangeText={(text) => this.onChanged(text)}
                                keyboardType='numeric' style={{textAlign: 'center'}}/>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Icon name="plus" size={30} color="#900" style={{margin: 10}} onPress={this.onUp}/>
                                <Icon name="minus" size={30} color="#009" style={{margin: 10}} onPress={this.onDown}/>
                            </View>

                        </View>

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

    showLightBox = () => {
        this.props.navigator.showLightBox({
            screen: "example.Types.LightBox",
            passProps: {
                title: 'توجه',
                content: 'به سبد خرید اضافه شد',
                onClose: this.dismissLightBox,
            },
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                tapBackgroundToDismiss: true
            }
        });
    };
    dismissLightBox = () => {
        this.props.navigator.dismissLightBox();
    };


}

offer.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
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
