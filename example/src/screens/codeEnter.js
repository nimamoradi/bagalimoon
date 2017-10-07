import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    Image,
    Dimensions,


} from 'react-native';
import server from '../code'
let data;
let Categories;
let isDataReady = false;

class codeEnter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {code: ''};
        this.loadData();
        this.loadCategories();
    }

    loadData() {

        console.log("get data");
        fetch(server.getServerAddress()+'/app', {
            method: 'GET',

        }).then((response) => response.json().then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData);
                data = responseData;
                isDataReady = true;

            }).catch(error => {
                alert('اینترنت قطع است')
            })
        );


    }

    loadCategories() {

        console.log("get Categories");

        fetch(server.getServerAddress()+'/api/getAllCategories', {
            method: 'POST',

        }).then((response) => response.json().then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData);
                Categories = responseData;
                // isDataReady=true;

            }).catch(error => {
                alert('اینترنت قطع است')
            })
        );


    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <Image source={require('../../img/trademark.png')}
                           style={{
                               flex: 1,
                               resizeMode: 'stretch',
                               width: Dimensions.get('window').width,
                               height: Dimensions.get('window').height / 2.1,
                               marginBottom: 10
                           }}/>
                </View>

                <View style={{flex: 1.3}}>


                    <Text style={styles.text}>کد دریافتی</Text>
                    <TextInput
                        onTextChange={(text) => setState({code: text})}
                        keyboardType='numeric' style={styles.textInput}>
                        {this.state.code}
                    </TextInput>

                    <TouchableOpacity
                        onPress={this.enterCode}
                    >
                        <Text style={{
                            textAlign: 'center', borderRadius: 20,
                            borderColor: '#bec4be',
                            borderWidth: 0.5,
                            backgroundColor: '#5bca45',
                            padding: 10,
                            margin: 40,
                            fontSize: 20,
                            color: '#ffffff'
                        }}>تایید</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    enterCode = () => {

        this.props.navigator.push({
            screen: 'example.Types',
            title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {
                navBarTranslucent: false
            }, // override the navigator style for the screen, see "Styling the navigator" below (optional)

            overrideBackPress: true,
            navigatorButtons: {
                leftButtons: [
                    {
                        id: 'ShoppingBasket',
                        icon: require('../../img/ShoppingBasket.png'),
                        style: {width: 5, height: 5}
                    },
                ],
                rightButtons: [

                    {
                        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                        icon: require('../../img/menu.png'), // for icon button, provide the local image asset name
                    }
                ],
            }, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            passProps: {pageData: data,Categories:Categories}

        });
    };


}


codeEnter.propTypes = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eeeceb'
    },
    rowMain: {},
    subRow: {
        flex: 1,
        margin: 50,

        flexDirection: 'column',
        alignItems: 'flex-end'

    },
    text: {
        margin: 50,
        marginBottom: 10,
        marginLeft: 10,
    },
    textInput: {
        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,

        width: '100%',

    },
    flex: {
        flex: 1,
    }
});
export default codeEnter;
