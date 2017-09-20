import {Platform, Text, StyleSheet, View, TouchableOpacity, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './screens';


// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

const tabs = [{
    // label: 'Navigation',
    screen: 'example.Types',
    icon: require('../img/list.png'),
    title: 'فروشگاه باما',
},];

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
Navigation.registerComponent('CustomButton', () => CustomButton);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'example.Types', // unique ID registered with Navigation.registerScreen
        title: 'بقالی مون', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {
            // leftButtons: [
            //     {
            //         title: 'Edit',
            //         id: 'back',
            //
            //     },
            // ],
            rightButtons: [
                // {
                // title: 'Edit', // for a textual button, provide the button title (label)
                //     id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                //     testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
                //     disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
                //     disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                //     showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                //     buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                //     buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                //     buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                // }
                // ,
                {
                    icon: require('../img/menu.png'), // for icon button, provide the local image asset name
                    id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                }
            ],
        } // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
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
        animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
        // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
        disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
    },
    passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
    animationType: 'fade', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'

});