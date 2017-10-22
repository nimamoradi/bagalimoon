import {Platform, Text, StyleSheet, View, TouchableOpacity, AsyncStorage, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './screens';
import {vw, vh, vmin, vmax} from './viewport'


// screen related book keeping
registerScreens();
registerScreenVisibilityListener();
const styles = StyleSheet.create({
    button: {
        overflow: 'hidden',
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// Our custom component we want as a button in the nav bar
const CustomButton = () =>
    <TouchableOpacity
        style={[styles.button, {backgroundColor: 'tomato'}]}
        onPress={() => console.log('pressed me!')}
    >
        <View style={styles.button}>
            <Text style={{color: 'blac'}}>
                hi
            </Text>
        </View>
    </TouchableOpacity>;

// Register the component
Navigation.registerComponent('CustomButton', () => CustomButton);
console.log('api code reading');
AsyncStorage.getItem('api_code').then((item) => {

    let startAppdata;
    if (item === null)
        startAppdata = {
            screen: {
                screen: 'example.Types.loginScreen', // unique ID registered with Navigation.registerScreen
                navigatorStyle: {
                    navBarHidden: true,
                }

            },
            appStyle: {
                orientation: 'portrait',
            },
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


        };
    else //user is logined before
        startAppdata = {
            screen: {
                screen: 'example.Types', // unique ID registered with Navigation.registerScreen
                title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
                navigatorStyle: {
                    navBarTranslucent: false
                }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                navigatorButtons: {
                    leftButtons: [
                        {
                            id: 'ShoppingBasket',
                            icon: require('../img/ShoppingBasket.png'),
                            style: {width: 5 * vw, height: 5 * vw},

                        },
                    ],
                    rightButtons: [
                        {
                            style: {width: 5 * vw, height: 5 * vw},
                            id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                            icon: require('../img/menu.png'), // for icon button, provide the local image asset name
                        }
                    ],
                } // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            },
            appStyle: {
                orientation: 'portrait',
            },
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
            passProps: {api_code: item}, // simple serializable object that will pass as props to all top screens (optional)


        };
    Navigation.startSingleScreenApp(startAppdata);

});


