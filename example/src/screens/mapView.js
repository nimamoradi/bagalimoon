import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    AsyncStorage,
    PermissionsAndroid,
    Dimensions,
    Picker
} from 'react-native';
import Loading from '../components/loadScreen'
import MapView from 'react-native-maps';
import server from "../code";
import {vw, vh, vmin, vmax} from '../viewport'
import fetch from '../fetch'
import _ from 'lodash'
import SimpleNavbar from "../navBars/SimpleNavbar";
import {SceneMap, TabBar, TabViewAnimated, TabViewPagerExperimental, TabViewPagerScroll} from "react-native-tab-view";

let Radio = require('../components/index');
let Option = Radio.Option;
let context;

class mapView extends Component {
    isAvailable = () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, server.getTimeOut(), 'Request timed out');
        });

        const request = fetch(server.getServerAddress());

        return Promise
            .race([timeout, request])
            .then(response => {
                context.getAddresses();
            })
            .catch(error => {
                // console.log('error is' + error);
                server.retry(this.isAvailable, context)
            });
    };

    load_api_code = () => {
        AsyncStorage.getItem('api_code').then((item) => {

            context.setState({api_code: item}, () => {
                context.isAvailable();

            })

        })
    };

    getAddresses() {

        // console.log("get Addresses");
        fetch(server.getServerAddress() + '/api/getAddresses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_code: context.state.api_code,
            })
        }).then((response) => response.json().then((responseData) => {

                context.setState({oldAddresses: responseData, sendData: false})
            }).catch(error => {
                // console.log('error is getAddresses ' + error);
                server.retry(this.isAvailable, context)
            })
        );


    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {

                    'title': 'مجوز دسترسی به موقیت',
                    'message': 'برنامه برای رساندن محصول نیاز به ادرس شماست'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log("You can use the Location");
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // console.log(position);
                        this.setState({
                            myLocation: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            error: null,
                        });
                    },
                    (error) => {
                        // console.log(error)
                    }),
                    {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
                ;
            } else {
                this.setState({
                    error: null,
                });
                server.alert('اخطار', 'مجوز داده نشد', context)
            }
        } catch (err) {
            console.warn(err)
        }
    }

    constructor(props) {
        super(props);
        this.props.navigator.setDrawerEnabled({side: 'right', enabled: false});
        this.state = {
            latitude: 36.288022,
            longitude: 59.616075,
            myLocation: null,
            optionSelected: 0,
            error: null,
            myAddress: [],
            sendData: true,
            myAddressName: '',
            serverAdderss: '',
            oldAddresses: [],
            api_code: '',
            senderName: '',
            myAddress_id: -1,
            index: 0,
            routes: [
                {key: 'first', title: 'آدرس جدید'},
                {key: 'second', title: 'آدرس قدیمی'},
            ],
        };
        context = this;
        this.props.navigator.setStyle({navBarHidden: true,})
    }

    componentDidMount() {
        this.load_api_code();
        this.requestLocationPermission();

    }

    newAddresses = () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, server.getTimeOut(), 'Request timed out');
        });

        const request = fetch(server.getServerAddress() + '/api/addNewAddress', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_code: context.state.api_code,
                address: {
                    name: context.state.myAddressName,
                    city_id: "0",        //now select 0
                    state_id: "0", //now select 0
                    Address: context.state.myAddress,
                    lat: context.state.myLocation.latitude,
                    lng: context.state.myLocation.longitude,
                }
            })

        });
        return Promise
            .race([timeout, request])
            .then((response) => response.json().then((responseData) => {
                context.setState({sendData: false, myAddress_id: parseInt(responseData.id)})//add oldAddresses
                // console.log('respone' + responseData);
                context.finalBasket();
            }))
            .catch(error => {
                server.retry(this.newAddresses, context)
            });
    };


    _handleIndexChange = index => this.setState({index});

    _renderHeader = props => <TabBar
        style={{backgroundColor: 'red', borderRadius: 2 * vw, margin: 2 * vw, elevation: 10}} {...props} />;


    _renderScene = ({route}) => {
        switch (route.key) {
            case 'first':
                return <View style={styles.columnItem}>
                    <View style={styles.rowItem}>
                        <TextInput style={styles.borderText}
                                   onChangeText={(text) => this.setState({myAddressName: text})}>
                            {this.state.myAddressName}
                        </TextInput>
                        <ImageBackground
                            resizeMode="stretch"
                            style={styles.imageBack}
                            source={require('../../img/label.png')}>
                            <Text style={styles.Text}>نام آدرس</Text>
                        </ImageBackground>
                    </View>

                    <View style={styles.rowItem}>
                        <TextInput style={styles.borderText}
                                   onChangeText={(text) => this.setState({myAddress: text})}>
                            {this.state.myAddress}
                        </TextInput>
                        <ImageBackground
                            resizeMode="stretch"
                            style={styles.imageBack}
                            source={require('../../img/label.png')}>
                            <Text style={styles.Text}>آدرس</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.center}>
                        <TouchableOpacity
                            onPress={_.debounce(this.offlineSale,
                                1000, {leading: true, trailing: false})}
                            style={styles.bigButton}>
                            <Text style={styles.bigButtonText}>نهایی کردن خرید</Text>
                        </TouchableOpacity>
                    </View>
                </View>;
            case 'second':
                let oldAddresses = this.state.oldAddresses.map(function (x) {
                    return <Picker.Item value={x.id} label={x.name + ' : ' + x.Address}/>
                });
                return <View style={styles.columnItem}>
                    <View style={styles.rowItem}>
                        <Picker
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                serverAdderss: itemValue,
                                myAddress_id: itemValue
                            })}
                            style={{flex: 2}}
                            selectedValue={this.state.serverAdderss}>
                            <Picker.Item value={-1} label={"لطفا یک آدرس انتخاب کنید"}/>
                            {oldAddresses}
                        </Picker>
                        <ImageBackground
                            resizeMode="stretch"
                            style={styles.imageBack}
                            source={require('../../img/label.png')}>
                            <Text style={styles.Text}>آدرس های قبلی</Text>
                        </ImageBackground>
                    </View>
                    <View style={styles.space}/>
                    <View style={styles.center}>
                        <TouchableOpacity
                            onPress={_.debounce(this.offlineSale,
                                1000, {leading: true, trailing: false})}
                            style={styles.bigButton}>
                            <Text style={styles.bigButtonText}>نهایی کردن خرید</Text>
                        </TouchableOpacity>
                    </View>
                </View>;
            default:
                return null;
        }
    };

    render() {

        if (this.state.sendData) return <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Loading/>
        </View>;
        else
            return (
                <View style={{
                    flex: 1,
                }}>
                    <SimpleNavbar title='آدرس' back={() => this.props.navigator.pop()}/>

                    <View style={{
                        backgroundColor: '#f2f2f2',
                        elevation: vw * 2,
                        top: 0, left: 5 * vw, right: 0, bottom: 0,
                        height: vw * 100, width: 90 * vw,
                        borderRadius: 4 * vw,
                        flex: 2.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}>

                        <MapView
                            style={styles.map}
                            region={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            onLongPress={(e) => {
                                this.setState({
                                    myLocation: e.nativeEvent.coordinate,
                                    latitude: e.nativeEvent.coordinate.latitude,
                                    longitude: e.nativeEvent.coordinate.longitude
                                });
                            }}>


                            {((context.state.myLocation !== null)) ?
                                <MapView.Marker draggable
                                                coordinate={this.state.myLocation}
                                                onDragEnd={(e) => {
                                                    this.setState({
                                                        myLocation: e.nativeEvent.coordinate,
                                                        latitude: e.nativeEvent.coordinate.latitude,
                                                        longitude: e.nativeEvent.coordinate.longitude
                                                    });
                                                }
                                                }

                                /> : null}
                        </MapView>


                    </View>
                    <View
                        style={{flex: 1.5, flexDirection: 'column', alignContent: 'center', alignItems: 'flex-start'}}>
                        <View style={styles.rowItem}>

                            <TextInput style={styles.borderText}
                                       placeholder="نام"
                                       onChangeText={(text) => this.setState({senderName: text})}>
                                {context.state.senderName}
                            </TextInput>
                            <ImageBackground
                                resizeMode="stretch"
                                style={styles.imageBack}
                                source={require('../../img/label.png')}>
                                <Text style={styles.Text}>نام تحویل گیرنده</Text>
                            </ImageBackground>
                        </View>


                    </View>
                    <TabViewAnimated
                        style={{flex: 5}}
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderFooter={this._renderHeader}
                        onIndexChange={this._handleIndexChange}
                        initialLayout={{
                            height: 25 * vh,
                            width: vw * 100,
                        }}
                        useNativeDriver
                    />

                </View>

            );
    }


    offlineSale = () => {
        // console.log(context.state.myLocation);
        if (context.state.senderName !== '' && context.state.senderName !== undefined && context.state.senderName.search(/[a-zA-Z]/) === -1) {
            if (context.state.optionSelected === 1 || context.state.optionSelected === 0) {

                if (!(context.state.myAddress !== null && context.state.myAddress !== '' && context.state.myAddressName !== ''
                        && context.state.myAddressName !== null)) {
                    server.alert('اخطار',
                        'همه فیلدها پر نشده اند',
                        context);
                }
                else if (context.state.myLocation === null) {
                    server.alert('اخطار',
                        'موقیت خود را انتخاب کنید',
                        context);
                }
                else {
                    context.setState({sendData: true});
                    this.newAddresses();
                }
            }
            else if (context.state.optionSelected === 2) {

                if (context.state.myAddress_id === null || context.state.myAddress_id === -1)
                    server.alert('اخطار',
                        "لطفا آدرس را انتخاب کنید",
                        context);

                else
                    this.finalBasket();


            }

        }
        else if (context.state.senderName.search(/[a-zA-Z]/) !== -1) {
            server.alert('اخطار',
                'نام تحویل گیرنده باید فارسی باشد',
                context);

        }
        else
            server.alert('اخطار',
                'نام تحویل گیرنده الزامی است',
                context);


    };
    finalBasket = () => {

        this.props.navigator.push({
            screen: 'example.Types.basketFinal',
            title: 'خرید را نهایی کنید',
            passProps: {
                api_code: context.state.api_code,
                id: context.state.myAddress_id,
                basket: context.props.basket,
                senderName: context.state.senderName,
            },
        });
    }

}

const styles = StyleSheet.create({
        center: {
            marginTop: 10 * vh,
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        space: {
            height: 8 * vh,
        },
        columnItem: {
            flex: 1,
        },
        rowItem: {
            flexDirection: 'row',
            backgroundColor: '#f2f2f2',
            elevation: 2 * vw,
            borderRadius: 2 * vw,
            margin: 5,
            alignItems: 'center',
            height: 7 * vh,
        },
        imageBack: {
            width: 20 * vw, height: 10 * vh,
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,
            margin: 2 * vw,
            marginRight: -2 * vw,
            justifyContent: 'center',
        },
        container: {
            height: Dimensions.get('window').width * 0.9,
            width: Dimensions.get('window').width * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5 * vw,
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        borderText: {
            width: 60 * vw,
            fontSize: vw * 4,
            margin: 10,
            color: 'black',
            fontFamily: 'B Yekan',
            height: vh * 6,

        },
        Text: {
            fontSize: vw * 4,
            margin: 10,
            color: 'white',
            fontFamily: 'B Yekan',
        },
        bigButton: {
            backgroundColor: '#cbe6a3',
            elevation: 2 * vw,
            borderRadius: 2 * vw,
            height: 6 * vh,
            width: 50 * vw,
            padding:5,
            borderColor:'black',
            borderWidth:0.75
        },
        bigButtonText: {
            color: 'black',
            textAlign: 'center',
            fontSize: vw * 6,
        }
    }
);


export default mapView;
