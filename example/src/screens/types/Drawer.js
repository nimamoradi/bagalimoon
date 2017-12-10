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
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {vw, vh, vmin, vmax} from '../../viewport'
import server from "../../code";

let context;

class MyClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {user_number: ''};
        context = this;
        AsyncStorage.getItem('user_number').then((item) => {
            context.setState({user_number: item})
        });
    }

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
        this.props.navigator.push({
            screen: 'example.Types.orderHistroy',
            passProps: {
                api_code:this.props.api_code
            },


        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{backgroundColor: '#eeeceb', flex: 1, width: 300, justifyContent: 'center',}}>
                    <Image style={styles.image} source={require('../../../img/grocery.png')}/>
                    <Text style={{alignSelf: 'flex-end', fontSize: vw * 4}}>{this.state.user_number}</Text>
                </View>
                <View style={{backgroundColor: '#fafafa50', flex: 3, width: 300,}}>
                    <TouchableOpacity
                        onPress={() => server.showLightBox('example.Types.basketLightBox', {
                            title: this.props.title,
                            onClose: this.dismissLightBox,
                        }, context)}>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'center'}}>
                            <Icon name="shopping-cart" size={vw * 6} color="green"
                                  style={{margin: 10, alignSelf: 'flex-start'}}/>
                            <Text style={{marginTop: 35 / 2, fontSize: vw * 4}}>سبد خرید</Text>

                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={(() => this.orderHistroy())}>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'center'}}>
                            <MaterialIcon name="history" size={vw * 6} color="#ff5500"
                                          style={{margin: 10, alignSelf: 'flex-start'}}/>
                            <Text style={{marginTop: 35 / 2, fontSize: vw * 4}}> سوابق سفارش</Text>

                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {

                        }}>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'center'}}>
                            <Ionicons name="ios-call-outline" size={vw * 6} color="#11ff11"
                                      style={{margin: 10, alignSelf: 'flex-start'}}/>
                            <Text style={{marginTop: 35 / 2, fontSize: vw * 4}}> ارتباط با ما</Text>

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
                            <Icon name="info-circle" size={vw * 6} color="#72bcd4"
                                  style={{margin: 10, alignSelf: 'flex-start'}}/>
                            <Text style={{marginTop: 35 / 2, fontSize: vw * 4}}>درباره ما</Text>

                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.clear();
                            BackHandler.exitApp();

                        }}>
                        <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'center'}}>
                            <MaterialIcon name="logout" size={vw * 6} color="#C42B2D"
                                          style={{margin: 10, alignSelf: 'flex-start'}}/>
                            <Text style={{marginTop: 35 / 2, fontSize: vw * 4}}>خروج</Text>

                        </View>

                    </TouchableOpacity>


                </View>

            </View>
        );
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
        height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
    ,
});

export default MyClass;
