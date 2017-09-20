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
                title: ' hi'
                //  size:size,
            },


        });
    };

    render() {
        return (
            <ScrollView contentContainerStyle={{flex: 1, margin: 15,    flexDirection: "column",
                alignItems: "stretch",}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text>
                            ji
                        </Text>
                    </View>
                    <Image source={{
                        uri: this.props.imageUrl
                    }}
                           style={{flex: 1}}/>

                </View>
                <View style={{flex: 0.35,justifyContent:"center" ,alignItems:"center"}}>
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
    flexRow: { flexDirection: 'row'},
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
    image: {flex: 1, alignSelf: 'stretch', width: undefined, height: undefined},
    buttonText: {
        textAlign: 'center',
        margin: 10,

        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,


    }
});

export default offer;
