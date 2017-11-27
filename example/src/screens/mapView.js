import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
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

        console.log("get Addresses");
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
                console.log("You can use the Location");
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);
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
                        console.log(error)
                    }),
                    {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
                ;
            } else {
                alert('مجوز داده نشد')
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
            myLocation: [],
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
        };


        context = this;
    }

    componentDidMount() {
        this.requestLocationPermission();
        this.load_api_code();


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
                console.log('respone' + responseData);
                context.finalBasket();
            }))
            .catch(error => {
                server.retry(this.newAddresses, context)
            });
    };

    newAddresses2() {
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
        console.log("addNewAddress");
        return Promise
            .race([timeout, request])
            .then((response) => response.json().then((responseData) => {

                context.setState({sendData: false, myAddress_id: parseInt(responseData.id)})//add oldAddresses

                context.finalBasket();
            })
                .catch(error => {
                    server.retry(this.newAddresses, context)
                }));

        // context.finalBasket();

    }

    onSelect(index) {
        this.setState({
            optionSelected: index + 1
        });
    }

    render() {
        let oldAddresses = this.state.oldAddresses.map(function (x) {
            return <Picker.Item value={x.id} label={x.name + ' : ' + x.Address}/>
        });
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
                <ScrollView>

                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    </View>
                    <View style={{height: Dimensions.get('window').width - 100,}}>
                        <View style={styles.container}>
                            <MapView
                                style={styles.map}
                                region={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                                onLongPress={(e) => {
                                    this.setState({myLocation: e.nativeEvent.coordinate});
                                    this.setState({latitude: e.nativeEvent.coordinate.latitude});
                                    this.setState({longitude: e.nativeEvent.coordinate.longitude});
                                }}>
                                <MapView.Marker draggable
                                                coordinate={this.state.myLocation}
                                                onDragEnd={(e) => {
                                                    this.setState({myLocation: e.nativeEvent.coordinate});
                                                    this.setState({latitude: e.nativeEvent.coordinate.latitude});
                                                    this.setState({longitude: e.nativeEvent.coordinate.longitude});
                                                }
                                                }

                                />
                            </MapView>
                        </View>
                    </View>
                    <View>
                        <Radio onSelect={this.onSelect.bind(this)} defaultSelect={this.state.optionSelected}>
                            <Option color="gray" selectedColor="#008BEF">
                                <View>
                                    <Text style={styles.Text}>نام آدرس</Text>
                                    <TextInput style={styles.borderText}
                                               onChangeText={(text) => this.setState({myAddressName: text})}>
                                        {this.state.myAddressName}
                                    </TextInput>

                                    <Text style={styles.Text}>آدرس</Text>
                                    <TextInput style={styles.borderText}
                                               onChangeText={(text) => this.setState({myAddress: text})}>
                                        {this.state.myAddress}
                                    </TextInput>

                                </View>
                            </Option>
                            <Option color="gray" selectedColor="#008BEF">
                                <View>
                                    <Text style={styles.Text}>آدرس های قبلی</Text>
                                    <Picker
                                        onValueChange={(itemValue, itemIndex) => this.setState({
                                            serverAdderss: itemValue,
                                            myAddress_id: itemValue
                                        })}
                                        style={styles.picker}
                                        selectedValue={this.state.serverAdderss}>
                                        <Picker.Item value={-1} label={"لطفا یک آدرس انتخاب کنید"}/>
                                        {oldAddresses}
                                    </Picker>

                                </View>
                            </Option>

                        </Radio>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={this.offlineSale}
                            style={styles.bigButton}>
                            <Text style={styles.bigButtonText}>نهایی کردن خرید</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}>
                            <Text style={{
                                fontSize: vw * 4,
                                fontFamily: 'B Yekan', textAlign: 'center'
                            }}>نام تحویل گیرنده</Text>
                            <TextInput
                                style={{
                                    fontSize: vw * 4,
                                    fontFamily: 'B Yekan', textAlign: 'center'
                                }}
                                onChangeText={(text) => this.setState({senderName: text})}
                                placeholder="نام">
                                {context.state.senderName}
                            </TextInput>
                        </View>
                    </View>

                </ScrollView>
            );
    }


    offlineSale = () => {

        if (context.state.senderName !== '' && context.state.senderName !== undefined && context.state.senderName.search(/[a-zA-Z]/) === -1) {
            if (context.state.optionSelected === 1 || context.state.optionSelected === 0) {

                if (!(context.state.myAddress !== null && context.state.myAddress !== '' && context.state.myAddressName !== ''
                        && context.state.myAddressName !== null)) {
                    server.alert('اخطار',
                        'همه فیلدها پر نشده اند',
                        context);
                }
                else if (context.state.myLocation === null && context.state.myAddress === [] && context.state.myAddress.size === 0) {
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

        console.log('saved' + this.state.myLocation);

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
        container: {
            ...StyleSheet.absoluteFillObject,
            height: Dimensions.get('window').width - 100,
            width: Dimensions.get('window').width,
            justifyContent: 'center',
            alignItems: 'center',
        },
        map: {
            ...StyleSheet.absoluteFillObject,
        },
        borderText: {
            padding: 2,
            fontSize: vw * 4,
            margin: 10,
            fontFamily: 'B Yekan',
            borderRadius: 10,
            borderColor: 'gray', borderWidth: 1,
            height: vh * 6,
        },
        Text: {
            fontSize: vw * 4,
            margin: 10,
            fontFamily: 'B Yekan',
        }, bigButton: {
            height: 80,
            flex: 1, alignContent: 'center', borderRadius: 10,
            borderColor: '#aeb3ae',
            borderWidth: 1,
            margin: 10,
            backgroundColor: '#23d42920',
        },
        bigButtonText: {
            textAlign: 'center',
            fontSize: vw * 6,
            marginTop: 20,
            alignItems: 'center',
            alignContent: 'center',
        }
    }
);


export default mapView;
