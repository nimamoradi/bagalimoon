import React from 'react';
import {StyleSheet, View, Button, TouchableOpacity,AsyncStorage, Image, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {vw, vh, vmin, vmax} from '../../viewport'

class MyClass extends React.Component {
    dismissLightBox = async (sendTOHome) => {
        this.props.navigator.dismissLightBox();
        if (sendTOHome)
            this.props.navigator.pop();

    };

    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'right',
            animated: true
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#eeeceb', flex: 1, width: 300, justifyContent: 'center',}}>
                    <Image style={styles.image} source={require('../../../img/gyro_header.jpg')}/>
                    <Text style={{alignSelf: 'flex-end',fontSize:vw*4}}>jjdfd fo</Text>
                </View>
                <View style={{backgroundColor: '#fafafa50', flex: 3, width: 300,}}>
                    <TouchableOpacity
                        onPress={() => this.showLightBox('example.Types.basketLightBox', {
                            title: this.props.title,
                            onClose: this.dismissLightBox,
                        },)}>
                        <View style={{flexDirection:'row',alignSelf:'flex-end',alignContent:'center'}}>
                            <Icon name="shopping-cart" size={vw*6} color="green" style={{margin: 10,alignSelf:'flex-start'}}/>
                            <Text  style={{marginTop:35/2,fontSize:vw*4}}>سبد خرید</Text>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>{
                            AsyncStorage.clear();


                        }}>
                        <View style={{flexDirection:'row',alignSelf:'flex-end',alignContent:'center'}}>
                            <MaterialIcon name="logout" size={vw*6} color="#C42B2D" style={{margin: 10,alignSelf:'flex-start'}}/>
                            <Text  style={{marginTop:35/2,fontSize:vw*4}}>خروج</Text>

                        </View>

                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    showLightBox = (screen, passProps) => {
        this.toggleDrawer();
        this.props.navigator.showLightBox({
            screen: screen,
            passProps: passProps,
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                tapBackgroundToDismiss: true
            }
        })
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        flexDirection: 'column'
    },
    button: {},
    image: {
        height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: Dimensions.get('window').width / 6,
    }
    ,
});

export default MyClass;
