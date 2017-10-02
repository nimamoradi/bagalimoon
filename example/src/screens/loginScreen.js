import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput


} from 'react-native';


class loginScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.rowMain}>

                <View style={styles.subRow}/>
                <View style={styles.subRow}>
                    <Text style={styles.text}>شناسه</Text>
                    <TextInput style={styles.textInput}/>


                </View>
                <View style={styles.subRow}>
                    <Text style={styles.text}>رمز</Text>
                    <TextInput style={styles.textInput}/>


                </View>
                <View style={styles.subRow}/>
                <View style={{flexDirection:'column',justifyContent:'center'}}>
                    <TouchableOpacity
                    onPress={this.login}
                    >
                        <Text style={{
                            textAlign: 'center', borderRadius: 20,
                            borderColor: '#bec4be',
                            borderWidth: 0.5,
                            backgroundColor: '#5bca45',
                            padding:10,
                            margin:10,
                            fontSize:20,
                            color:'#ffffff'
                        }}>ورود</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{
                            textAlign: 'center', borderRadius: 20,
                            borderColor: '#bec4be',
                            borderWidth: 0.5,
                            backgroundColor: '#4b54ce',
                            padding: 10,
                            margin:10,
                            fontSize:20,
                            color:'white'
                        }}>ثبت نام</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    login = () => {
        this.props.navigator.pop();
        this.props.navigator.push({
            screen: 'example.Types',
            title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {
                navBarTranslucent: false
            }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            passProps: {},
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

            drawer: { // optional, add this if you want a side menu drawer in your app
                right: { // optional, define if you want a drawer from the right
                    screen: 'example.Types.Drawer', // unique ID registered with Navigation.registerScreen
                    passProps: {} // simple serializable object that will pass as props to all top screens (optional)
                },
                style: { // ( iOS only )
                    drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                    contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
                    leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
                    rightDrawerWidth: 50 // optional, add this if you want a define right drawer width (50=percent)
                },
                type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
                animationType: 'parallax', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
                disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
            },
        });
    };


}


loginScreen.propTypes = {};

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

export default loginScreen;
