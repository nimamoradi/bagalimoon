import React from 'react';
import {
    StyleSheet,
    BackHandler,
    View,
    Button,
    TouchableOpacity,
    AsyncStorage,
    Image,
    Text,

    Share
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {vw, vh, vmin, vmax} from '../../viewport'
import server from "../../code";
import basketfile from "../../basketFile";

let context;

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

    orderHistroy() {
        this.toggleDrawer();
        this.props.navigator.push({
            screen: 'example.Types.orderHistroy',
            title: 'سوابق سفارش',
            passProps: {
                api_code: this.props.api_code
            },


        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#eeeceb', flex: 1, width: 300, justifyContent: 'center',}}>
                    <Image
                        resizeMode='stretch'
                        style={styles.image} source={require('../../../img/grocery.png')}/>
                    <Text style={{alignSelf: 'center', fontSize: vw * 5, fontFamily: 'B Yekan',}}>فروشگاه بزرگ
                        بقالیمون</Text>
                </View>
                <View style={{
                    backgroundColor: '#fafafa50', flex: 3,
                    flexDirection: 'column', marginRight: 2 * vw,
                    marginBottom: 4 * vh,
                    justifyContent: 'space-between', width: 300,
                }}>


                    <TouchableOpacity
                        onPress={(() => this.orderHistroy())}>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'center'}}>
                            <MaterialIcon name="history" size={vw * 8} color="#ff5500"
                                          style={{margin: 10, alignSelf: 'flex-start'}}/>
                            <Text style={styles.textFont}> سوابق سفارش</Text>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.toggleDrawer();
                            this.props.navigator.push({
                                screen: 'example.about_us',
                                title: 'درباره ما',
                            });
                        }}>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'center'}}>
                            <Icon name="info-circle" size={vw * 8} color="#72bcd4"
                                  style={{margin: 10, alignSelf: 'flex-start'}}/>
                            <Text style={styles.textFont}>درباره ما</Text>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            Share.share({
                                message: 'خرید اسان با قیمت مناسب',
                                url: 'https://www.baghali.amins.ir',
                                title: 'بقالمون'
                            }, {});
                        }}>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'center'}}>
                            <Icon name="share-square-o" size={vw * 8} color="#ff0d04"
                                  style={{margin: 10, alignSelf: 'flex-start'}}/>
                            <Text style={styles.textFont}>اشتراک</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.backPressed();

                        }}>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'center'}}>
                            <MaterialIcon name="logout" size={vw * 8} color="#C42B2D"
                                          style={{margin: 10, alignSelf: 'flex-start'}}/>
                            <Text style={styles.textFont}>خروج</Text>

                        </View>

                    </TouchableOpacity>


                </View>

            </View>
        );
    }

    backPressed = () => {
        AsyncStorage.clear();
        this.props.navigator.resetTo({
            screen: 'example.Types.loginScreen', // unique ID registered with Navigation.registerScreen
            navigatorStyle: {
                navBarTranslucent: false,
                navBarHidden: true,
            },
            animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
            navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
        });

    }


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
        height: 30 * vw, width: 30 * vw,
        alignSelf: 'center',
        flex: 4,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
    , textFont: {marginTop: 35 / 2, fontFamily: 'B Yekan', fontSize: vw * 6}
});

export default MyClass;
