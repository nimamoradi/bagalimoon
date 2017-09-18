import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

class offer extends Component {
    desPan = () => {
        this.props.navigator.push({
            screen: 'example.Types.descriptionPan',
            title: 'hot offer',
            passProps: {
               // date:data ,
               //  size:size,
            },


        });
    };
    opinion = () => {
        this.props.navigator.push({
            screen: 'example.Types.opinion',
            title: 'نظرات',
            passProps: {
                title:' hi'
                //  size:size,
            },


        });
    };

    render() {
        return (
            <ScrollView>
                <View>
                    <View style={styles.container}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Image style={styles.image} source={{uri: this.props.imageUrl}}/>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity
                            onPress={this.opinion}
                            >
                                <Text style={{
                                    margin: 10,
                                    borderRadius: 10,
                                    borderColor: '#bec4be',
                                    borderWidth: 0.5,
                                    padding: 20
                                }}>
                                    نظرات کاربران
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                             onPress={this.desPan}>
                                <Text style={{
                                    margin: 10,
                                    borderRadius: 10,
                                    borderColor: '#bec4be',
                                    borderWidth: 0.5,
                                    padding: 20,
                                }}>
                                    مشخصات محصول
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.des}>{this.props.des}</Text>
                    </View>

                    <TouchableOpacity
                        color="#ffff00"
                        style={{
                            margin: 15,
                            marginLeft: 150,
                            marginRight: 150,
                        }}
                        onPress={this.showLightBox}>
                        <Text style={{
                            flex: 1,

                            backgroundColor: '#8ac47d',
                            flexDirection: 'row',
                            textAlign: 'center',
                            borderColor: '#6bb7dd',
                            borderRadius: 20,
                            justifyContent: 'center',
                        }}>
                            افزودن به سبد خرید
                        </Text>
                    </TouchableOpacity>
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
    , des: {
        padding: 15,
        fontSize: 16,


    },
    image: {flex: 1, resizeMode: 'stretch', width: 380, height: 380}
});

export default offer;
