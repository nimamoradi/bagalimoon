import {Platform, Text, StyleSheet, View, TouchableOpacity, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './screens';


// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

// if (Platform.OS === 'android') {
//   tabs.push({
//     label: 'Transitions',
//     screen: 'example.Transitions',
//     icon: require('../img/transform.png'),
//     title: 'Navigation Transitions',
//   });
// }

// this will start our app
// Navigation.startTabBasedApp({
//   tabs,
//   animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
//   tabsStyle: {
//     tabBarBackgroundColor: '#003a66',
//     navBarButtonColor: '#ffffff',
//     tabBarButtonColor: '#ffffff',
//     navBarTextColor: '#ffffff',
//     tabBarSelectedButtonColor: '#ff505c',
//     navigationBarColor: '#003a66',
//     navBarBackgroundColor: '#003a66',
//     statusBarColor: '#002b4c',
//     tabFontFamily: 'BioRhyme-Bold',
//   },
//   appStyle: {
//     tabBarBackgroundColor: '#003a66',
//     navBarButtonColor: '#ffffff',
//     tabBarButtonColor: '#ffffff',
//     navBarTextColor: '#ffffff',
//     tabBarSelectedButtonColor: '#ff505c',
//     navigationBarColor: '#003a66',
//     navBarBackgroundColor: '#003a66',
//     statusBarColor: '#002b4c',
//     tabFontFamily: 'BioRhyme-Bold',
//   },
//   drawer: {
//     right: {
//       screen: 'example.Types.Drawer'
//     }
//   }
// });
// Register the component
// Navigation.registerComponent('CustomButton', () => CustomButton);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'example.Types.loginScreen', // unique ID registered with Navigation.registerScreen
        navigatorStyle: {
            navBarHidden: true,
        }

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

    animationType: 'fade', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'

});