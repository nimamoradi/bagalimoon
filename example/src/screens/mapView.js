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

import MapView from 'react-native-maps';
import server from "../code";
import {vw, vh, vmin, vmax} from '../viewport'

let Radio = require('../components/index');
let Option = Radio.Option;
let context;

class mapView extends Component {
    loadPreviewsAddress = async () => {
        let value;
        try {
            console.log('loading address');
            value = await AsyncStorage.getItem('@lastAddress');
            if (value === null) {

                console.log('don\'t have previews value');
                return '';
            }
            else {

                console.log(' ادرس ' + value);
                this.setState({myLastAddress: value,});
            }
        }
        catch (error) {
            console.log('can\'t load data ' + error);
        }
    };

    load_api_code = () => {
        AsyncStorage.getItem('api_code').then((item) => {

            context.setState({api_code: item}, () => {
                context.getAddresses(item);

            })

        })
    };

    getAddresses(item) {

        console.log("get Addresses");
        fetch(server.getServerAddress() + '/api/getAddresses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_code: item,
            })
        }).then((response) => response.json().then((responseData) => {

                context.setState({oldAddresses: responseData})
            }).catch(error => {


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
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            latitude: 36.288022,
            longitude: 59.616075,
            myLocation: {
                latitude: 36.288022,
                longitude: 59.616075,
            },
            optionSelected: 0,
            error: null,
            myAddress: [],
            myLastAddress: '',
            myAddressName: '',
            oldAddresses: [],
            api_code: '',
        };


        context = this;
    }

    componentDidMount() {
        this.requestLocationPermission();
        this.load_api_code();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({
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

    }


    newAddresses() {

        console.log("addNewAddress");

        fetch(server.getServerAddress() + '/api/addNewAddress', {
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

        }).then((response) => response.json().then((responseData) => {

                context.setState({oldAddresses: responseData})
            }).catch(error => {


            })
        );


    }

    onSelect(index) {
        this.setState({
            optionSelected: index + 1
        });
    }

    render() {
        let oldAddresses = this.state.oldAddresses.map(function (x) {
            return <Picker.Item value={x.Address} label={x.name + ' : ' + x.Address}/>
        });
        return (
            <ScrollView>
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
                                this.setState({myLocation: e.nativeEvent.coordinate})
                                this.setState({latitude: e.nativeEvent.coordinate.latitude})
                                this.setState({longitude: e.nativeEvent.coordinate.longitude})
                            }}>
                            <MapView.Marker draggable
                                            coordinate={this.state.myLocation}
                                            onDragEnd={(e) => {
                                                this.setState({myLocation: e.nativeEvent.coordinate})
                                                this.setState({latitude: e.nativeEvent.coordinate.latitude})
                                                this.setState({longitude: e.nativeEvent.coordinate.longitude})
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
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) => {
                                    }}>
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
                        <Text style={styles.bigButtonText}>پرداخت حضوری</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onlineSale}
                        style={styles.bigButton}>
                        <Text style={styles.bigButtonText}>پرداخت انلاین</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }

    onlineSale = async () => {
        if (context.state.myAddress !== null && context.state.myAddressName !== null && context.state.optionSelected === 1)
            this.newAddresses();
        else if (context.state.optionSelected === 1)
            alert('همه فیلدها پر نشده اند');
        console.log('saved' + this.state.myLocation);

    };
    offlineSale = async () => {
        if (context.state.myAddress !== null && context.state.myAddressName !== null && context.state.optionSelected === 1)
            this.newAddresses();
        else if (context.state.optionSelected === 1)
            alert('همه فیلدها پر نشده اند');
        console.log('saved' + this.state.myLocation);
    };

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
            fontSize: vw*4,
            margin: 10,
            fontFamily: 'B Yekan',
            borderRadius: 10,
            borderColor: 'gray', borderWidth: 1,
            height: vh*6,
        },
        Text: {
            fontSize: vw*4,
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
            fontSize: vw*6,
            marginTop: 20,
            alignItems: 'center',
            alignContent: 'center',
        }
    }
);


export default mapView;
