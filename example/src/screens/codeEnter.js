import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput


} from 'react-native';


class codeEnter extends React.Component {
    constructor(props) {
        super(props);
        this.state={pageData:''}
        this.loadData();
    }
    loadData() {

        console.log("get data");
        fetch('http://10.0.2.2/superserver/public/app', {
            method: 'GET',

        }).then((response) => response.json())
            .then((responseData) => {
                console.log("inside responsejson");
                console.log('response object:', responseData)

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
                    passProps: {pageData:responseData},

                });
            });
    }
    render() {
        return (
            <View style={styles.rowMain}>

                <View style={styles.subRow}/>
                <View style={styles.subRow}>
                    <Text style={styles.text}>شماره رمز</Text>
                    <TextInput keyboardType='numeric' style={styles.textInput}/>
                </View>


                <View style={styles.subRow}/>
                <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <TouchableOpacity
                        onPress={this.login}
                    >
                        <Text style={{
                            textAlign: 'center', borderRadius: 20,
                            borderColor: '#bec4be',
                            borderWidth: 0.5,
                            backgroundColor: '#7ab7ff',
                            padding: 10,
                            margin: 40,
                            fontSize: 20,
                            color: '#ffffff'
                        }}>ورود</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }



    login = () => {

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
            passProps: {pageData:this.state.pageData},

        });
    };


}


codeEnter.propTypes = {};

const styles = StyleSheet.create({

    rowMain: {},
    subRow: {
        flex: 1,
        margin: 50,

        flexDirection: 'column',
        alignItems: 'flex-end'

    },
    text: {

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
